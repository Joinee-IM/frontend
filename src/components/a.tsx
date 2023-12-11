// <div class="checkbox-wrapper-10">
//   <input class="tgl tgl-flip" id="cb5" type="checkbox" checked />
//   <label class="tgl-btn" data-tg-off="Nope" data-tg-on="Yeah!" for="cb5"></label>
// </div>
import styled, { css } from 'styled-components';

const Wrapper = styled.div``;

const Input = styled.input`
  display: none;
`;

const a = css`
  .checkbox-wrapper-10 .tgl,
  .checkbox-wrapper-10 .tgl:after,
  .checkbox-wrapper-10 .tgl:before,
  .checkbox-wrapper-10 .tgl *,
  .checkbox-wrapper-10 .tgl *:after,
  .checkbox-wrapper-10 .tgl *:before,
  .checkbox-wrapper-10 .tgl + .tgl-btn {
    box-sizing: border-box;
  }
  .checkbox-wrapper-10 .tgl::-moz-selection,
  .checkbox-wrapper-10 .tgl:after::-moz-selection,
  .checkbox-wrapper-10 .tgl:before::-moz-selection,
  .checkbox-wrapper-10 .tgl *::-moz-selection,
  .checkbox-wrapper-10 .tgl *:after::-moz-selection,
  .checkbox-wrapper-10 .tgl *:before::-moz-selection,
  .checkbox-wrapper-10 .tgl + .tgl-btn::-moz-selection,
  .checkbox-wrapper-10 .tgl::selection,
  .checkbox-wrapper-10 .tgl:after::selection,
  .checkbox-wrapper-10 .tgl:before::selection,
  .checkbox-wrapper-10 .tgl *::selection,
  .checkbox-wrapper-10 .tgl *:after::selection,
  .checkbox-wrapper-10 .tgl *:before::selection,
  .checkbox-wrapper-10 .tgl + .tgl-btn::selection {
    background: none;
  }
  .checkbox-wrapper-10 .tgl + .tgl-btn {
    outline: 0;
    display: block;
    width: 4em;
    height: 2em;
    position: relative;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .checkbox-wrapper-10 .tgl + .tgl-btn:after,
  .checkbox-wrapper-10 .tgl + .tgl-btn:before {
    position: relative;
    display: block;
    content: '';
    width: 50%;
    height: 100%;
  }
  .checkbox-wrapper-10 .tgl + .tgl-btn:after {
    left: 0;
  }
  .checkbox-wrapper-10 .tgl + .tgl-btn:before {
    display: none;
  }
  .checkbox-wrapper-10 .tgl:checked + .tgl-btn:after {
    left: 50%;
  }

  .checkbox-wrapper-10 .tgl-flip + .tgl-btn {
    padding: 2px;
    transition: all 0.2s ease;
    font-family: sans-serif;
    perspective: 100px;
  }
  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:after,
  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:before {
    display: inline-block;
    transition: all 0.4s ease;
    width: 100%;
    text-align: center;
    position: absolute;
    line-height: 2em;
    font-weight: bold;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    border-radius: 4px;
  }
  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:after {
    content: attr(data-tg-on);
    background: #02c66f;
    transform: rotateY(-180deg);
  }
  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:before {
    background: #ff3a19;
    content: attr(data-tg-off);
  }
  .checkbox-wrapper-10 .tgl-flip + .tgl-btn:active:before {
    transform: rotateY(-20deg);
  }
  .checkbox-wrapper-10 .tgl-flip:checked + .tgl-btn:before {
    transform: rotateY(180deg);
  }
  .checkbox-wrapper-10 .tgl-flip:checked + .tgl-btn:after {
    transform: rotateY(0);
    left: 0;
    background: #7fc6a6;
  }
  .checkbox-wrapper-10 .tgl-flip:checked + .tgl-btn:active:after {
    transform: rotateY(20deg);
  }
`;
