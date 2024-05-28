import React from 'react';
import { StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

interface PlotlyRadarChartProps {
    data: any;
    layout: any;
}

const PlotlyRadarChart = ({ data, layout }: PlotlyRadarChartProps) => {
  const radarChartHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
      </head>
      <body>
        <div id="radar" style="width:100%;height:100%;"></div>
        <script>
          document.addEventListener("message", function(event) {
            var data = JSON.parse(event.data).data;
            var layout = JSON.parse(event.data).layout;
            Plotly.newPlot('radar', data, layout);
          });
        </script>
      </body>
    </html>
  `;

  const injectedJavaScript = `
    document.dispatchEvent(new MessageEvent('message', {
      data: JSON.stringify({ data: ${JSON.stringify(data)}, layout: ${JSON.stringify(layout)} })
    }));
  `;

  return (
    <WebView
      originWhitelist={['*']}
      source={{ html: radarChartHtml }}
      style={styles.webview}
      injectedJavaScript={injectedJavaScript}
      javaScriptEnabled={true}
    />
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  webview: {
    width: '100%',
    height: '100%',
  }
});

export default PlotlyRadarChart;