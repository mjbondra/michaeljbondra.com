'use strict';

var app = angular.module('mjbondra.services.console-styles', []);

var fontFamily = 'Fira Sans, Helvetica Neue, Helvetica, Arial, sans-serif';

var black = '#333333'
  , blue = '#3399CC'
  , gray = '#777777'
  , red = '#EB5C62';

app.constant('consoleStyles', {
  h2: {
    'font-family': fontFamily,
    'font-size': '16px',
    'line-height': '40px',
    'font-weight': '300',
    'color': black
  },
  h3: {
    'padding': '8px 20px',
    'font-family': fontFamily,
    'font-size': '24px',
    'line-height': '60px',
    'font-weight': '700',
    'color': 'white',
    'background-color': black
  },
  description: {
    'font-family': fontFamily,
    'font-size': '16px',
    'line-height': '40px',
    'color': black
  },
  imageFallback: {
    'font-family': fontFamily,
    'font-size': '12px',
    'line-height': '36px',
    'color': red
  },
  message: {
    'font-family': fontFamily,
    'font-size': '12px',
    'font-weight': '300',
    'color': black
  },
  messageError: {
    'font-family': fontFamily,
    'font-size': '12px',
    'color': red
  },
  link: {
    'font-family': fontFamily,
    'font-size': '16px',
    'color': blue
  },
  tags: {
    'padding': '10px 20px',
    'font-family': fontFamily,
    'font-size': '16px',
    'line-height': '60px',
    'font-weight': '300',
    'color': 'white',
    'background-color': gray
  }
});
