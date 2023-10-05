import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  LabelList,
  PieChart,
  Pie,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { useState, useEffect } from 'react';

function Convert_Decimal_Point(number) {
  return number.toString().replace('.', '/');
}

export default function Charts(props) {
  const { showingAttrs } = props;
  const {
    chartType,
    xTicksType,
    xTicks,
    data,
    colors,
    arrowIndex,
    defaultStringsOnPie,
    lineNamesForLegend,
    hasLegend,
    customGrid,
    yMin,
    yMax,
    yStep,
  } = showingAttrs;
  const showArrows = new Array(data.length).fill(false);
  if (arrowIndex != -1) {
    showArrows[arrowIndex] = true;
  }
  const modifiedData = data.map((value, index) => ({
    name: xTicks[index],
    amount: value,
    label: defaultStringsOnPie ? xTicks[index] : xTicks[index] + ' (' + value + ')',
    fill: colors[index],
    arrow: showArrows[index],
  }));

  const getCustomXTick = ({ x, y, payload }) => {
    let path = '';

    switch (payload.value) {
      case '1':
        path =
          'M490.667,0H21.333C9.536,0,0,9.557,0,21.333v469.333C0,502.443,9.536,512,21.333,512h469.333c11.797,0,21.333-9.557,21.333-21.333V21.333C512,9.557,502.464,0,490.667,0z M256,298.667c-23.573,0-42.667-19.093-42.667-42.667s19.093-42.667,42.667-42.667s42.667,19.093,42.667,42.667S279.573,298.667,256,298.667z';
        break;
      case '2':
        path =
          'M490.667,0H21.333C9.536,0,0,9.557,0,21.333v469.333C0,502.443,9.536,512,21.333,512h469.333c11.797,0,21.333-9.557,21.333-21.333V21.333C512,9.557,502.464,0,490.667,0z M149.333,170.667c-23.573,0-42.667-19.093-42.667-42.667c0-23.573,19.093-42.667,42.667-42.667C172.907,85.333,192,104.427,192,128C192,151.573,172.907,170.667,149.333,170.667z M362.667,426.667C339.093,426.667,320,407.573,320,384c0-23.573,19.093-42.667,42.667-42.667c23.573,0,42.667,19.093,42.667,42.667C405.333,407.573,386.24,426.667,362.667,426.667z';
        break;
      case '3':
        path =
          'M490.667,0H21.333C9.536,0,0,9.557,0,21.333v469.333C0,502.443,9.536,512,21.333,512h469.333c11.797,0,21.333-9.557,21.333-21.333V21.333C512,9.557,502.464,0,490.667,0z M149.333,170.667c-23.573,0-42.667-19.093-42.667-42.667c0-23.573,19.093-42.667,42.667-42.667C172.907,85.333,192,104.427,192,128C192,151.573,172.907,170.667,149.333,170.667z M256,298.667c-23.573,0-42.667-19.093-42.667-42.667s19.093-42.667,42.667-42.667s42.667,19.093,42.667,42.667S279.573,298.667,256,298.667z M362.667,426.667C339.093,426.667,320,407.573,320,384c0-23.573,19.093-42.667,42.667-42.667c23.573,0,42.667,19.093,42.667,42.667C405.333,407.573,386.24,426.667,362.667,426.667z';
        break;
      case '4':
        path =
          'M490.667,0H21.333C9.536,0,0,9.557,0,21.333v469.333C0,502.443,9.536,512,21.333,512h469.333c11.797,0,21.333-9.557,21.333-21.333V21.333C512,9.557,502.464,0,490.667,0z M149.333,426.667c-23.573,0-42.667-19.093-42.667-42.667c0-23.573,19.093-42.667,42.667-42.667C172.907,341.333,192,360.427,192,384C192,407.573,172.907,426.667,149.333,426.667z M149.333,170.667c-23.573,0-42.667-19.093-42.667-42.667c0-23.573,19.093-42.667,42.667-42.667C172.907,85.333,192,104.427,192,128C192,151.573,172.907,170.667,149.333,170.667zM362.667,426.667C339.093,426.667,320,407.573,320,384c0-23.573,19.093-42.667,42.667-42.667c23.573,0,42.667,19.093,42.667,42.667C405.333,407.573,386.24,426.667,362.667,426.667z M362.667,170.667C339.093,170.667,320,151.573,320,128c0-23.573,19.093-42.667,42.667-42.667c23.573,0,42.667,19.093,42.667,42.667C405.333,151.573,386.24,170.667,362.667,170.667z';
        break;
      case '5':
        path =
          'M490.667,0H21.333C9.536,0,0,9.557,0,21.333v469.333C0,502.443,9.536,512,21.333,512h469.333c11.797,0,21.333-9.557,21.333-21.333V21.333C512,9.557,502.464,0,490.667,0z M149.333,426.667c-23.573,0-42.667-19.093-42.667-42.667c0-23.573,19.093-42.667,42.667-42.667C172.907,341.333,192,360.427,192,384C192,407.573,172.907,426.667,149.333,426.667z M149.333,170.667c-23.573,0-42.667-19.093-42.667-42.667c0-23.573,19.093-42.667,42.667-42.667C172.907,85.333,192,104.427,192,128C192,151.573,172.907,170.667,149.333,170.667zM256,298.667c-23.573,0-42.667-19.093-42.667-42.667s19.093-42.667,42.667-42.667s42.667,19.093,42.667,42.667S279.573,298.667,256,298.667z M362.667,426.667C339.093,426.667,320,407.573,320,384c0-23.573,19.093-42.667,42.667-42.667c23.573,0,42.667,19.093,42.667,42.667C405.333,407.573,386.24,426.667,362.667,426.667z M362.667,170.667C339.093,170.667,320,151.573,320,128c0-23.573,19.093-42.667,42.667-42.667c23.573,0,42.667,19.093,42.667,42.667C405.333,151.573,386.24,170.667,362.667,170.667z';
        break;
      default:
        path =
          'M490.667,0H21.333C9.536,0,0,9.557,0,21.333v469.333C0,502.443,9.536,512,21.333,512h469.333c11.797,0,21.333-9.557,21.333-21.333V21.333C512,9.557,502.464,0,490.667,0z M149.333,426.667c-23.573,0-42.667-19.093-42.667-42.667c0-23.573,19.093-42.667,42.667-42.667C172.907,341.333,192,360.427,192,384C192,407.573,172.907,426.667,149.333,426.667z M149.333,298.667c-23.573,0-42.667-19.093-42.667-42.667s19.093-42.667,42.667-42.667C172.907,213.333,192,232.427,192,256S172.907,298.667,149.333,298.667z M149.333,170.667c-23.573,0-42.667-19.093-42.667-42.667c0-23.573,19.093-42.667,42.667-42.667C172.907,85.333,192,104.427,192,128C192,151.573,172.907,170.667,149.333,170.667z M362.667,426.667C339.093,426.667,320,407.573,320,384c0-23.573,19.093-42.667,42.667-42.667c23.573,0,42.667,19.093,42.667,42.667C405.333,407.573,386.24,426.667,362.667,426.667zM362.667,298.667C339.093,298.667,320,279.573,320,256s19.093-42.667,42.667-42.667c23.573,0,42.667,19.093,42.667,42.667S386.24,298.667,362.667,298.667z M362.667,170.667C339.093,170.667,320,151.573,320,128c0-23.573,19.093-42.667,42.667-42.667c23.573,0,42.667,19.093,42.667,42.667C405.333,151.573,386.24,170.667,362.667,170.667z';
        break;
    }

    return (
      <svg x={x - 12} y={y + 4} width={24} height={24} viewBox="0 0 512 512" fill="#666">
        <path d={path} />
      </svg>
    );
  };

  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  if (chartType == 'bar') {
    const attributes = {
      dataKey: 'name',
    };

    if (xTicksType == 'image') {
      attributes.tick = getCustomXTick;
    }

    return (
      <div
        style={{
          direction: 'ltr',
          fontFamily: 'NAZANINF',
          width: windowSize[0] > 500 ? 500 : 350,
          minHeight: 250,
          margin: 'auto',
        }}
      >
        <BarChart
          width={windowSize[0] > 500 ? 500 : 350}
          height={250}
          data={modifiedData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis {...attributes} />
          <YAxis />
          <Bar dataKey="amount" fill="#8884d8" barSize={20}>
            <LabelList dataKey="amount" position="top" />
          </Bar>
        </BarChart>
      </div>
    );
  } else if (chartType == 'line') {
    const lineData = xTicks.map((value, index) => ({}));
    for (let i = 0; i < xTicks.length; i++) {
      lineData[i]['name'] = xTicks[i];
      for (let j = 0; j < data.length; j++) {
        lineData[i][hasLegend ? lineNamesForLegend[j] : 'amount' + j] = data[j][i];
      }
    }

    const lines = [];
    for (let i = 0; i < data.length; i++) {
      lines.push(
        <Line
          dataKey={hasLegend ? lineNamesForLegend[i] : 'amount' + i}
          stroke={colors[i]}
          label={({ x, y, index }) => {
            if (!customGrid) {
              return (
                <text x={x} y={y - 10} textAnchor="middle" dominantBaseline="middle">
                  {String(data[i][index]).replace('.', '/')}
                </text>
              );
            }
          }}
        />
      );
    }

    const horizontalPoints = [],
      realStep = (156 / (yMax - yMin)) * yStep;
    for (let i = 0; i * yStep < yMax - yMin; i++) {
      horizontalPoints.push(176 - (i + 1) * realStep);
    }

    return (
      <div
        style={{
          direction: 'ltr',
          fontFamily: 'NAZANINF',
          width: windowSize[0] > 500 ? 500 : 350,
          minHeight: 250,
          margin: 'auto',
        }}
      >
        <LineChart
          width={windowSize[0] > 500 ? 500 : 350}
          height={250}
          data={lineData}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          {lines}
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" horizontalPoints={customGrid ? horizontalPoints : []} />
          <XAxis dataKey="name" />
          <YAxis type="number" domain={[yMin, yMax]} />
          {hasLegend ? <Legend /> : null}
        </LineChart>
      </div>
    );
  }

  return (
    <div
      style={{
        direction: 'ltr',
        fontFamily: 'NAZANINF',
        width: windowSize[0] > 500 ? 500 : 250,
        minHeight: 350,
        margin: 'auto',
      }}
    >
      <PieChart
        width={windowSize[0] > 500 ? 500 : 250}
        height={350}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <Pie
          data={modifiedData}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={windowSize[0] > 500 ? 125 : 50}
          fill="#8884d8"
          label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
            const RADIAN = Math.PI / 180;
            const radius = 25 + innerRadius + (outerRadius - innerRadius);
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            return (
              <>
                {modifiedData[index].arrow ? (
                  <g transform={`rotate(${-midAngle} ${cx} ${cy})`}>
                    <path
                      d={`
                                                M ${cx} ${cy}
                                                l ${(outerRadius * 2) / 3} ${0}
                                                l ${-8} ${2}
                                                l ${0} ${-4}
                                                l ${8} ${2}
                                                l ${-8} ${2}
                                                l ${0} ${-4}
                                                l ${8} ${2}
                                            `}
                      fill="black"
                      stroke="black"
                      strokeWidth={5}
                      overflow="visible"
                      strokeLinecap="round"
                    />
                  </g>
                ) : null}
                <text
                  x={x}
                  y={y}
                  textAnchor={x > cx ? 'start' : 'end'}
                  dominantBaseline="central"
                  fontWeight="bold"
                  fontSize={windowSize[0] > 350 ? '1rem' : '0.6rem'}
                >
                  {Convert_Decimal_Point(modifiedData[index].label)}
                </text>
              </>
            );
          }}
        />
      </PieChart>
    </div>
  );
}

// \chart[chartType=pie, xTicksType=text, xTicks=["1" "2" "3" "4" "5" "6"], data=[100 300 20 40 70 30]]
// \chart[chartType=bar, xTicksType=image, xTicks=["1" "2" "3" "4" "5" "6"], data=[100 300 20 40 70 30]]
