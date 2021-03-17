For a general overview, see https://msdn.microsoft.com/en-us/library/cc645077(VS.95).aspx.

## The Tile Pyramid

When creating a DZI image, you specify a size, format, and overlap. The [conversion tool](http://openseadragon.github.io/examples/creating-zooming-images/) then goes through the image, breaking it into tiles. It starts with the full resolution image, and starts creating tiles from the upper left corner, with the first tile being 0_0, the next in the top row being 1_0, etc. The first tile on the next row is 0_1, etc. This becomes the highest-numbered layer.

The tool then scales the image down to half width, rounding odd-sized image sizes up, and runs through and tiles it again, using the same numbering system. This becomes the next level.

The tool continues scaling down by half and outputting new levels until the image is down to approximately 1px wide. This is the lowest level, and it's designated level 0. The next level above it is level 1, etc.

## Overlap

Tile overlap (if any) is added in addition to the normal tile size. Note that tile overlaps are on both sides of the join, so a one pixel overlap (for example) means tiles 0_0 and 1_0 have two columns of pixels in common.

<div style="display:flex;flex-direction:column;width:400px;height:300px;border-color:#888;border-width:2px;border-style:solid;">
Viewer.outerTracker (Viewer.container element)
<div style="flex:1 1 auto;display:flex;flex-direction:column;border-color:#888;border-width:2px;border-style:solid;margin:0 1em 1em 1em;">
Viewer.innerTracker (Viewer.canvas element)
<div style="flex:1 1 auto;display:flex;flex-direction:column;border-color:#888;border-width:2px;border-style:solid;margin:0 1em 1em 1em;">
Overlay element
</div>
</div>
</div>

## CodePen

<p class="codepen" data-height="265" data-theme-id="light" data-default-tab="js,result" data-user="msalsbery" data-slug-hash="dyOeXqO" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="OpenSeadragon MouseTracker">
  <span>See the Pen <a href="https://codepen.io/msalsbery/pen/dyOeXqO">
  OpenSeadragon MouseTracker</a> by Mark Salsbery (<a href="https://codepen.io/msalsbery">@msalsbery</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
