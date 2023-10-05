export default function BetweenArrows(props) {
  // do not change this line at all !!!

  const { showingAttrs, setUser_answer, answerToPut, children } = props;

  const { text, side } = showingAttrs;
  const li = [];

  if (text[2] === 'input' && side === 'left') {
    li.push(
      <foreignObject x="200" y="0" width="100" height="100">
        <div
          style={{
            textAlign: 'center',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            height: '100px',
            padding: '3px',
          }}
        >
          <span style={{ fontSize: '60px' }}>ʹ</span>
          {children[1]}:{children[0]}
        </div>
      </foreignObject>
    );
  } else if (text[2] == 'input' && side == 'right') {
    li.push(
      <foreignObject x="200" y="0" width="100" height="100">
        <div
          style={{
            textAlign: 'center',
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'center',
            height: '100px',
            padding: '3px',
          }}
        >
          <span style={{ fontSize: '60px' }}>ʹ</span>
          {children[3]}:{children[2]}
        </div>
      </foreignObject>
    );
  } else {
    li.push(
      <foreignObject x="200" y="0" width="100" height="100">
        <div>
          <p
            style={{
              fontSize: '2rem',
              textAlign: 'center',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              height: '100px',
            }}
          >
            {' '}
            {'ʹ' + text[2]}
          </p>
        </div>
      </foreignObject>
    );
  }
  // main clock test

  if (side == 'right' || side == 'both') {
    // right arrow
    li.push(<path d="M305 50 L395 50 M385 40 L395 50 L385 60" fill="none" strokeWidth={4} stroke={'black'} />);
    // right arrow text
    li.push(
      <foreignObject x="305" y="0" width="90" height="45">
        <div>
          <p
            style={{
              textAlign: 'center',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              height: '45px',
            }}
          >
            {text[3]}
          </p>
        </div>
      </foreignObject>
    );
    // right input or text
    if (text[4] == 'input') {
      li.push(
        <foreignObject x="400" y="0" width="100" height="100">
          <div
            style={{
              textAlign: 'center',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              height: '100px',
              padding: '3px',
            }}
          >
            <span style={{ fontSize: '60px' }}>ʹ</span>
            {children[3]}:{children[2]}
          </div>
        </foreignObject>
      );
    } else {
      li.push(
        <foreignObject x="400" y="0" width="100" height="100">
          <p
            style={{
              textAlign: 'center',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              height: '100px',
              fontSize: '2rem',
            }}
          >
            {'ʹ' + text[4]}
          </p>
        </foreignObject>
      );
    }
  }
  if (side == 'left' || side == 'both') {
    // left arrow
    li.push(<path d="M195 50 L105 50 M115 40 L105 50 L115 60" fill="none" strokeWidth={4} stroke={'black'} />);

    // left arrow text
    li.push(
      <foreignObject x="105" y="0" width="90" height="45">
        <div>
          <p
            style={{
              textAlign: 'center',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              height: '45px',
            }}
          >
            {text[1]}
          </p>
        </div>
      </foreignObject>
    );
    // left input or text
    if (text[0] == 'input') {
      li.push(
        <foreignObject x="0" y="0" width="100" height="100">
          <div
            style={{
              textAlign: 'center',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              height: '100px',
              padding: '3px',
            }}
          >
            <span style={{ fontSize: '60px' }}>ʹ</span>
            {children[1]}:{children[0]}
          </div>
        </foreignObject>
      );
    } else {
      li.push(
        <foreignObject x="0" y="0" width="100" height="100">
          <p
            style={{
              textAlign: 'center',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'center',
              height: '100px',
              fontSize: '2rem',
            }}
          >
            {'ʹ' + text[0]}
          </p>
        </foreignObject>
      );
    }
  }

  return (
    <svg viewBox="0 0 500 100" style={{ fontFamily: 'NAZANINF', fontWeight: 'bold' }}>
      {li}
    </svg>
  );
}

// \between_arrows[side="both",text=["input" "456" "789" "fgg" "input"]]{\input[id=inp1, type=str]}{\input[id=inp2, type=str]}{\input[id=inp3, type=str]}{\input[id=inp4, type=str]}
