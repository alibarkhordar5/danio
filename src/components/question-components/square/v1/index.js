import useInnerWidth from 'src/hooks/use-inner-width';

const Index = (props) => {
  const {showingAttrs} = props;
  const { array } = showingAttrs;
  
  let number_list = [];

  const innerWidth = useInnerWidth();

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      let color = array[i][j] == 1 ? '#00ff00' : 'white';
      number_list.push(<rect x={j * 30} y={i * 30} width="30" height="30" fill={color} stroke="black" />);
    }
  }

  let WIDTH = Math.min(array.length * 10, 100);
  if (innerWidth < 500) {
    WIDTH = Math.min(array.length * 20, 100);
  }

  return innerWidth > 500 ? (
    <div style={{ margin: '7px' }}>
      <svg width={`${WIDTH}%`} viewBox={`0 0 ${array.length * 30} ${array[0].length * 30}`}>
        {number_list}
      </svg>
    </div>
  ) : (
    <div style={{ margin: '7px' }}>
      <svg width={`${WIDTH}%`} viewBox={`0 0 ${array.length * 30} ${array[0].length * 30}`}>
        {number_list}
      </svg>
    </div>
  );
};

// \square[array=[[1 1 1 1 1 1 1 1 1] [1 1 1 1 1 1 1 1 1] [1 1 1 1 1 1 1 1 1]]]

export default Index;
