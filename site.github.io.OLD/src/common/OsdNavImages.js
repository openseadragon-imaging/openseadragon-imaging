import zoomin_grouphover from 'openseadragon/images/zoomin_grouphover.png';
import zoomin_hover from 'openseadragon/images/zoomin_hover.png';
import zoomin_pressed from 'openseadragon/images/zoomin_pressed.png';
import zoomin_rest from 'openseadragon/images/zoomin_rest.png';

import zoomout_grouphover from 'openseadragon/images/zoomout_grouphover.png';
import zoomout_hover from 'openseadragon/images/zoomout_hover.png';
import zoomout_pressed from 'openseadragon/images/zoomout_pressed.png';
import zoomout_rest from 'openseadragon/images/zoomout_rest.png';

import home_grouphover from 'openseadragon/images/home_grouphover.png';
import home_hover from 'openseadragon/images/home_hover.png';
import home_pressed from 'openseadragon/images/home_pressed.png';
import home_rest from 'openseadragon/images/home_rest.png';

import fullpage_grouphover from 'openseadragon/images/fullpage_grouphover.png';
import fullpage_hover from 'openseadragon/images/fullpage_hover.png';
import fullpage_pressed from 'openseadragon/images/fullpage_pressed.png';
import fullpage_rest from 'openseadragon/images/fullpage_rest.png';

import rotateleft_grouphover from 'openseadragon/images/rotateleft_grouphover.png';
import rotateleft_hover from 'openseadragon/images/rotateleft_hover.png';
import rotateleft_pressed from 'openseadragon/images/rotateleft_pressed.png';
import rotateleft_rest from 'openseadragon/images/rotateleft_rest.png';

import rotateright_grouphover from 'openseadragon/images/rotateright_grouphover.png';
import rotateright_hover from 'openseadragon/images/rotateright_hover.png';
import rotateright_pressed from 'openseadragon/images/rotateright_pressed.png';
import rotateright_rest from 'openseadragon/images/rotateright_rest.png';

import flip_grouphover from 'openseadragon/images/flip_grouphover.png';
import flip_hover from 'openseadragon/images/flip_hover.png';
import flip_pressed from 'openseadragon/images/flip_pressed.png';
import flip_rest from 'openseadragon/images/flip_rest.png';

import previous_grouphover from 'openseadragon/images/previous_grouphover.png';
import previous_hover from 'openseadragon/images/previous_hover.png';
import previous_pressed from 'openseadragon/images/previous_pressed.png';
import previous_rest from 'openseadragon/images/previous_rest.png';

import next_grouphover from 'openseadragon/images/next_grouphover.png';
import next_hover from 'openseadragon/images/next_hover.png';
import next_pressed from 'openseadragon/images/next_pressed.png';
import next_rest from 'openseadragon/images/next_rest.png';

const navImages = {
  zoomIn: {
    REST: zoomin_rest,
    GROUP: zoomin_grouphover,
    HOVER: zoomin_hover,
    DOWN: zoomin_pressed
  },
  zoomOut: {
    REST: zoomout_rest,
    GROUP: zoomout_grouphover,
    HOVER: zoomout_hover,
    DOWN: zoomout_pressed
  },
  home: {
    REST: home_rest,
    GROUP: home_grouphover,
    HOVER: home_hover,
    DOWN: home_pressed
  },
  fullpage: {
    REST: fullpage_rest,
    GROUP: fullpage_grouphover,
    HOVER: fullpage_hover,
    DOWN: fullpage_pressed
  },
  rotateleft: {
    REST: rotateleft_rest,
    GROUP: rotateleft_grouphover,
    HOVER: rotateleft_hover,
    DOWN: rotateleft_pressed
  },
  rotateright: {
    REST: rotateright_rest,
    GROUP: rotateright_grouphover,
    HOVER: rotateright_hover,
    DOWN: rotateright_pressed
  },
  flip: {
    REST: flip_rest,
    GROUP: flip_grouphover,
    HOVER: flip_hover,
    DOWN: flip_pressed
  },
  previous: {
    REST: previous_rest,
    GROUP: previous_grouphover,
    HOVER: previous_hover,
    DOWN: previous_pressed
  },
  next: {
    REST: next_rest,
    GROUP: next_grouphover,
    HOVER: next_hover,
    DOWN: next_pressed
  }
};

export default navImages;
