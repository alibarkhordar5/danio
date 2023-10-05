const Index = (props) => {
  const { showingAttrs } = props;
  const { path='/assets/question-images/skill-images/G6c1s4_3/1.png' } = showingAttrs;

  return (
    <svg
      viewBox="0 0 100 100"
      id="some-random-id"
      width={'50%'}
      onClick={(event) => {
        event.preventDefault();
        let point = document.getElementById('some-random-id').createSVGPoint();
        point.x = event.clientX;
        point.y = event.clientY;
        point = point.matrixTransform(document.getElementById('some-random-id').getScreenCTM().inverse());
        alert(point.x + ' ' + point.y);
      }}
    >
      <image width="100%" height="100%" href={path} />
      <rect x={0} y={0} width={100} height={100} fill="none" stroke="black" strokeWidth={1} />
    </svg>
  );
}

// \coordinate_getter[path="/images/circles/2/14.svg"]

export default Index;
