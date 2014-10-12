'use strict';

var app = angular.module('mjbondra.services.console-styles', []);

app.constant('consoleStyles', {
  h2: {
    'font-family': 'Fira Sans',
    'font-size': '16px',
    'line-height': '40px',
    'font-weight': '300',
    'color': '#333333'
  },
  h3: {
    'padding': '8px 20px',
    'font-family': 'Fira Sans',
    'font-size': '24px',
    'line-height': '60px',
    'font-weight': '700',
    'color': 'white',
    'background-color': '#333333'
  },
  description: {
    'font-family': 'Fira Sans',
    'font-size': '16px',
    'line-height': '40px',
    'color': '#333333'
  },
  imageFallback: {
    'font-family': 'Fira Sans',
    'font-size': '12px',
    'line-height': '36px',
    'color': '#EB5C62',
  },
  message: {
    'font-family': 'Fira Sans',
    'font-size': '12px',
    'font-weight': '300',
    'color': '#333333'
  },
  messageError: {
    'font-family': 'Fira Sans',
    'font-size': '12px',
    'color': '#EB5C62'
  },
  link: {
    'font-family': 'Fira Sans',
    'font-size': '16px',
    'color': '#3399CC'
  },
  tags: {
    'padding': '10px 20px',
    'font-family': 'Fira Sans',
    'font-size': '16px',
    'line-height': '60px',
    'font-weight': '300',
    'color': 'white',
    'background-color': '#777777',
  }
});
