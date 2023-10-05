const useSvgDrag = (svgId, doAfterMove, doAfterUp) => {
  const startMouseDrag = (event, options) => {
    event.preventDefault();

    let point = document.getElementById(svgId).createSVGPoint();

    const onMouseMove = (event) => {
      event.preventDefault();

      point.x = event.clientX;
      point.y = event.clientY;
      point = point.matrixTransform(document.getElementById(svgId).getScreenCTM().inverse());

      doAfterMove(point, options);
    };

    const onMouseUp = (event) => {
      event.preventDefault();

      doAfterUp(point, options);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const startTouchDrag = (event, options) => {
    event.preventDefault();

    let point = document.getElementById(svgId).createSVGPoint();

    const onTouchMove = (event) => {
      event.preventDefault();

      point.x = event.touches[0].pageX;
      point.y = event.touches[0].pageY;
      point = point.matrixTransform(document.getElementById(svgId).getScreenCTM().inverse());

      doAfterMove(point, options);
    };

    const onTouchEnd = (event) => {
      event.preventDefault();

      doAfterUp(point, options);

      document.removeEventListener('touchmove', onTouchMove, { passive: false });
      document.removeEventListener('touchend', onTouchEnd, { passive: false });
    };

    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', onTouchEnd, { passive: false });
  };

  return { startMouseDrag, startTouchDrag };
};

export default useSvgDrag;
