/*
 * Copyright (c) 2019 Mark Salsbery
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/* global OpenSeadragon */

(function ($) {
	/**
	 * @class HdViewTileSource
	 * @memberof OpenSeadragon
	 * @extends OpenSeadragon.TileSource
	 * @param {Object} options - the idiomatic
	 *      options object which is used instead of positional arguments.
	 */
	$.HdViewTileSource = function (options) {
		var i, rect, level;

		this._levelRects = {};
		this.tilesUrl = options.tilesUrl;
		this.displayRects = options.displayRects;

		if (this.displayRects) {
			for (i = this.displayRects.length - 1; i >= 0; i--) {
				rect = this.displayRects[i];
				for (level = rect.minLevel; level <= rect.maxLevel; level++) {
					if (!this._levelRects[level]) {
						this._levelRects[level] = [];
					}
					this._levelRects[level].push(rect);
				}
			}
		}

		$.TileSource.apply(this, [options]);
	};

	$.extend(
		$.HdViewTileSource.prototype,
		$.TileSource.prototype,
		/** @lends OpenSeadragon.HdViewTileSource.prototype */ {
			/**
			 * Determine if the data and/or url imply the image service is supported by
			 * this tile source.
			 * @function
			 * @param {Object|Array} data
			 * @param {String} optional - url
			 */
			supports: function (data, url) {
				var imageSets;
				var imageSetNode;
				if (
					data.root &&
					data.root.imageset &&
					data.root.imageset.url &&
					data.root.imageset.width &&
					data.root.imageset.height &&
					data.root.imageset.tileWidth &&
					data.root.imageset.tileHeight &&
					data.root.imageset.levels
				) {
					return true;
				} else if (data.documentElement) {
					if (
						data.documentElement.localName === 'root' ||
						data.documentElement.tagName === 'root'
					) {
						imageSets = data.documentElement.getElementsByTagName(
							'imageset'
						);
						if (imageSets.length > 0) {
							imageSetNode = imageSets[0];
							if (
								imageSetNode.hasAttribute('url') &&
								imageSetNode.hasAttribute('width') &&
								imageSetNode.hasAttribute('height') &&
								imageSetNode.hasAttribute('tileWidth') &&
								imageSetNode.hasAttribute('tileHeight') &&
								imageSetNode.hasAttribute('levels')
							) {
								return true;
							}
						}
					}
				}

				return false;
			},

			/**
			 *
			 * @function
			 * @param {Object|XMLDocument} data - the raw configuration
			 * @param {String} url - the url the data was retrieved from if any.
			 * @return {Object} options - A dictionary of keyword arguments sufficient
			 *      to configure this tile sources constructor.
			 */
			configure: function (data, url) {
				var options;

				if (!$.isPlainObject(data)) {
					options = configureFromXML(this, data);
				} else {
					options = configureFromObject(this, data);
				}

				// url = './data/hawaii_stitch_hdv.xml'
				// options.root.imageset.url = 'hawaii_stitch_files/{l}/{c}_{r}.jpg'
				if (url && !options.tilesUrl) {
					// options.tilesUrl = url.replace(
					//         /([^\/]+?)(\.(dzi|xml|js)?(\?[^\/]*)?)?\/?$/, '$1_files/');
					options.tilesUrl = url.replace(
						/[^/]*$/,
						options.root.imageset.url
					);

					if (url.search(/\.(dzi|xml|js)\?/) !== -1) {
						options.queryParams = url.match(/\?.*/);
					} else {
						options.queryParams = '';
					}
				}

				return options;
			},

			/**
			 * @function
			 * @param {Number} level
			 * @param {Number} x
			 * @param {Number} y
			 */
			getTileUrl: function (level, x, y) {
				// this.tilesUrl = './data/hawaii_stitch_files/{l}/{c}_{r}.jpg'
				var url =
					this.tilesUrl
						.replace(/{l}/, level.toString(10))
						.replace(/{c}/, x.toString(10))
						.replace(/{r}/, y.toString(10)) + this.queryParams;
				return url;
			},

			/**
			 * @function
			 * @param {Number} level
			 * @param {Number} x
			 * @param {Number} y
			 */
			tileExists: function (level, x, y) {
				var rects = this._levelRects[level],
					rect,
					scale,
					xMin,
					yMin,
					xMax,
					yMax,
					i;

				if (
					(this.minLevel && level < this.minLevel) ||
					(this.maxLevel && level > this.maxLevel)
				) {
					return false;
				}

				if (!rects || !rects.length) {
					return true;
				}

				for (i = rects.length - 1; i >= 0; i--) {
					rect = rects[i];

					if (level < rect.minLevel || level > rect.maxLevel) {
						continue;
					}

					scale = this.getLevelScale(level);
					xMin = rect.x * scale;
					yMin = rect.y * scale;
					xMax = xMin + rect.width * scale;
					yMax = yMin + rect.height * scale;

					xMin = Math.floor(xMin / this._tileWidth);
					yMin = Math.floor(yMin / this._tileWidth); // DZI tiles are square, so we just use _tileWidth
					xMax = Math.ceil(xMax / this._tileWidth);
					yMax = Math.ceil(yMax / this._tileWidth);

					if (xMin <= x && x < xMax && yMin <= y && y < yMax) {
						return true;
					}
				}

				return false;
			}
		}
	);

	/**
	 * @private
	 * @inner
	 * @function
	 */
	function configureFromXML(tileSource, xmlDoc) {
		if (!xmlDoc || !xmlDoc.documentElement) {
			throw new Error($.getString('Errors.Xml'));
		}

		var root = xmlDoc.documentElement,
			rootName = root.localName || root.tagName,
			configuration = null,
			// displayRects   = [],
			// dispRectNodes,
			// dispRectNode,
			// rectNode,
			imageSetNode; //,
		//i;

		if (rootName === 'root') {
			try {
				imageSetNode = root.getElementsByTagName('imageset')[0];
				//if (imageSetNode === undefined) {
				//    imageSetNode = root.getElementsByTagNameNS(ns, 'Size' )[0];
				//}

				configuration = {
					root: {
						imageset: {
							//DisplayRect: null,
							//xmlns:       '', //'http://schemas.microsoft.com/deepzoom/2008',
							url: imageSetNode.getAttribute('url'),
							levels: parseInt(
								imageSetNode.getAttribute('levels'),
								10
							),
							width: parseInt(
								imageSetNode.getAttribute('width'),
								10
							),
							height: parseInt(
								imageSetNode.getAttribute('height'),
								10
							),
							projection: imageSetNode.getAttribute('projection'),
							alphaBlend: parseFloat(
								imageSetNode.getAttribute('alphaBlend')
							),
							maxZoom: parseFloat(
								imageSetNode.getAttribute('maxZoom')
							),
							tileWidth: parseInt(
								imageSetNode.getAttribute('tileWidth'),
								10
							),
							tileHeight: parseInt(
								imageSetNode.getAttribute('tileHeight'),
								10
							),
							tileOverlap: parseInt(
								imageSetNode.getAttribute('tileOverlap'),
								10
							)
						}
					}
				};

				//TODO check configuration.root.imageset.url for supported tile format
				// if ( !$.imageFormatSupported( configuration.format ) ) {
				//     throw new Error(
				//         $.getString( 'Errors.ImageFormat', configuration.format.toUpperCase() )
				//     );
				// }

				// dispRectNodes = root.getElementsByTagName('DisplayRect' );
				// if (dispRectNodes === undefined) {
				//     dispRectNodes = root.getElementsByTagNameNS(ns, 'DisplayRect' )[0];
				// }

				// for ( i = 0; i < dispRectNodes.length; i++ ) {
				//     dispRectNode = dispRectNodes[i];
				//     rectNode     = dispRectNode.getElementsByTagName('Rect' )[0];
				//     if (rectNode === undefined) {
				//         rectNode = dispRectNode.getElementsByTagNameNS(ns, 'Rect' )[0];
				//     }

				//     displayRects.push({
				//         Rect: {
				//             X: parseInt( rectNode.getAttribute( 'X' ), 10 ),
				//             Y: parseInt( rectNode.getAttribute( 'Y' ), 10 ),
				//             Width: parseInt( rectNode.getAttribute( 'Width' ), 10 ),
				//             Height: parseInt( rectNode.getAttribute( 'Height' ), 10 ),
				//             MinLevel: parseInt( dispRectNode.getAttribute( 'MinLevel' ), 10 ),
				//             MaxLevel: parseInt( dispRectNode.getAttribute( 'MaxLevel' ), 10 )
				//         }
				//     });
				// }

				// if ( displayRects.length ) {
				//     configuration.root.DisplayRect = displayRects;
				// }

				return configureFromObject(tileSource, configuration);
			} catch (e) {
				throw e instanceof Error
					? e
					: new Error($.getString('Errors.Dzi'));
			}
		}
		// else if ( rootName === 'Collection' ) {
		//     throw new Error( $.getString( 'Errors.Dzc' ) );
		// }
		else if (rootName === 'Error') {
			var messageNode = root.getElementsByTagName('Message')[0];
			var message = messageNode.firstChild.nodeValue;
			throw new Error(message);
		}

		throw new Error($.getString('Errors.Dzi'));
	}

	// <?xml version="1.0"?>
	// <root>
	// 	<imageset
	// 		url="hawaii_stitch_files/{l}/{c}_{r}.jpg"
	// 		levels="14"
	// 		width="7056"
	// 		height="3024"
	// 		projection="perspective"
	// 		alphaBlend="1"
	// 		maxZoom="2.000000"
	// 		tileWidth="254"
	// 		tileHeight="254"
	// 		tileOverlap="1"
	// 	/>
	// </root>

	// <?xml version="1.0" encoding="utf-8"?>
	// <root>
	//   <imageset
	// 		url="l_{l}/c_{c}/tile_{r}.tif"
	// 		levels="7"
	// 		width="34344"
	// 		height="33946"
	// 		tileWidth="1024"
	// 		tileHeight="1024"
	// 		tileOverlap="0"
	// 		projection="perspective"
	// 		maxZoom="4"
	// 		step="2"
	// 		subRect="0 0 34344 33946"
	//   />
	//   <metadata>
	// 	   <physicalsize>
	// 	     <x>1.717200e-004</x>
	// 	     <y>1.697300e-004</y>
	// 	   </physicalsize>
	// 	   <pixelsize>
	// 	     <x>5.000000e-009</x>
	// 	     <y>5.000000e-009</y>
	// 	   </pixelsize>
	//   </metadata>
	// </root>

	/**
	 * @private
	 * @inner
	 * @function
	 */
	function configureFromObject(tileSource, configuration) {
		var imageData = configuration.root.imageset,
			tilesUrl = '', //imageData.url,
			//dispRectData  = imageData.DisplayRect || [],
			width = imageData.width,
			height = imageData.height,
			minLevel = 0,
			maxLevel = imageData.levels - 1,
			tileWidth = imageData.tileWidth,
			tileHeight = imageData.tileHeight,
			tileOverlap = imageData.tileOverlap,
			displayRects = [];
		// rectData,
		// i;

		// for ( i = 0; i < dispRectData.length; i++ ) {
		//     rectData = dispRectData[i].Rect;

		//     displayRects.push( new $.DisplayRect(
		//         parseInt( rectData.X, 10 ),
		//         parseInt( rectData.Y, 10 ),
		//         parseInt( rectData.Width, 10 ),
		//         parseInt( rectData.Height, 10 ),
		//         parseInt( rectData.MinLevel, 10 ),
		//         parseInt( rectData.MaxLevel, 10 )
		//     ));
		// }

		return $.extend(
			true,
			{
				width: width /* width *required */,
				height: height /* height *required */,
				tileWidth: tileWidth /* tileWidth *required */,
				tileHeight: tileHeight /* tileHeight *required */,
				tileOverlap: tileOverlap /* tileOverlap *required */,
				minLevel: minLevel /* minLevel */,
				maxLevel: maxLevel /* maxLevel */,
				tilesUrl: tilesUrl /* tilesUrl */,
				displayRects: displayRects /* displayRects */
			},
			configuration
		);
	}
})(OpenSeadragon);
