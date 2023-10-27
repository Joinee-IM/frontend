import styled from 'styled-components';

import '@/view/components/style.css';

const Container = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  font-size: 15px;
  line-height: 1.7;
  color: #102770;
  background-color: #ffeba7;
  padding: 10px 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Controller = styled.input`
  &:checked + label,
  &:not(:checked) + label {
    box-sizing: border-box;
    position: relative;
    display: block;
    text-align: center;
    width: 260px;
    height: 44px;
    border-radius: 4px;
    padding: 0;
    margin: 0 auto;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 14px;
    letter-spacing: 1px;
    line-height: 44px;
    padding: 0 25px;
    padding-right: 27px;
    overflow: hidden;
    color: #fff;
    text-align: left;
    &:before {
      position: absolute;
      content: '';
      z-index: -2;
      background-color: #102770;
      width: 100%;
      height: 100%;
      display: block;
      top: 0;
      left: 0;
    }
    &:after {
      position: absolute;
      content: '';
      z-index: -1;
      background-color: #ffeba7;
      width: 128px;
      height: 40px;
      display: block;
      top: 2px;
      left: 2px;
      border-radius: 2px;
      transition: left 300ms linear;
    }
  }
  &:checked + label:after {
    left: 50%;
  }
  &:checked ~ .card-3d-wrap .card-3d-wrapper {
    transform: rotateY(180deg);
    transition: transform 700ms 400ms ease-out;
    .img-1 {
      opacity: 0;
      transform: translate3d(-50px, 25px, 45px) perspective(100px);
      pointer-events: none;
      transition:
        transform 400ms ease,
        opacity 200ms 150ms ease;
    }
    .img-3 {
      opacity: 0;
      transform: translate3d(-50px, 5px, 55px) perspective(100px) scale(0.4);
      pointer-events: none;
      transition:
        transform 400ms ease,
        opacity 200ms 150ms ease;
    }
    .img-6 {
      opacity: 0;
      transform: translate3d(0, 0, 25px) perspective(100px) scale(0.4);
      pointer-events: none;
      transition:
        transform 400ms ease,
        opacity 200ms 150ms ease;
    }
    .img-4 {
      opacity: 1;
      pointer-events: auto;
      transform: translate3d(0, 0, 45px) perspective(100px) scale(1);
      transition:
        transform 400ms 1200ms ease,
        opacity 300ms 1200ms ease;
    }
    .img-5 {
      opacity: 1;
      pointer-events: auto;
      transform: translate3d(0, 0, 35px) perspective(100px) scale(1) rotate(10deg);
      transition:
        transform 400ms 1300ms ease,
        opacity 300ms 1300ms ease;
    }
    .img-7 {
      opacity: 1;
      pointer-events: auto;
      transform: translate3d(0, 0, 35px) perspective(100px) scale(1);
      transition:
        transform 400ms 1300ms ease,
        opacity 300ms 1300ms ease;
    }
  }
`;

export default function FlipCard() {
  return (
    <Container>
      <div className="section text-center py-5 py-md-0">
        <Controller type="checkbox" id="pricing" name="pricing" />
        <label htmlFor="pricing">
          <span className="block-diff">
            kayaking<span className="float-right">camping</span>
          </span>
        </label>
        <div className="card-3d-wrap mx-auto">
          <div className="card-3d-wrapper">
            <div className="card-front">
              <div className="pricing-wrap">
                <h4 className="mb-5">Kayaking</h4>
                <h2 className="mb-2">
                  <sup>$</sup>39 / 4<sup>hrs</sup>
                </h2>
                <p className="mb-4">per person</p>
                <p className="mb-1">
                  <i className="uil uil-location-pin-alt size-22"></i>
                </p>
                <p className="mb-4">Drina, Serbia</p>
                <a href="#0" className="link">
                  Choose Date
                </a>
                <div className="img-wrap img-2">
                  <img src="https://assets.codepen.io/1462889/sea.png" alt="" />
                </div>
                <div className="img-wrap img-1">
                  <img src="https://assets.codepen.io/1462889/kayak.png" alt="" />
                </div>
                <div className="img-wrap img-3">
                  <img src="https://assets.codepen.io/1462889/water.png" alt="" />
                </div>
                <div className="img-wrap img-6">
                  <img src="https://assets.codepen.io/1462889/Stone.png" alt="" />
                </div>
              </div>
            </div>
            <div className="card-back">
              <div className="pricing-wrap">
                <h4 className="mb-5">Camping</h4>
                <h2 className="mb-2">
                  <sup>$</sup>29 / 8<sup>hrs</sup>
                </h2>
                <p className="mb-4">per person</p>
                <p className="mb-1">
                  <i className="uil uil-location-pin-alt size-22"></i>
                </p>
                <p className="mb-4">Tara, Serbia</p>
                <a href="#0" className="link">
                  Choose Date
                </a>
                <div className="img-wrap img-2">
                  <img src="https://assets.codepen.io/1462889/grass.png" alt="" />
                </div>
                <div className="img-wrap img-4">
                  <img src="https://assets.codepen.io/1462889/camp.png" alt="" />
                </div>
                <div className="img-wrap img-5">
                  <img src="https://assets.codepen.io/1462889/Ivy.png" alt="" />
                </div>
                <div className="img-wrap img-7">
                  <img src="https://assets.codepen.io/1462889/IvyRock.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
