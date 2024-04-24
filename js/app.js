ZC.LICENSE = ["569d52cefae586f634c54f86dc99e6a9", "b55b025e438fa8a98e32482b5f768ff5"];
// window:load event for Javascript to run after HTML
// because this Javascript is injected into the document head


function getAgeData(county, year){
  var data = $.ajax({
    url: "https://gis.dola.colorado.gov/lookups/sya?&county="+county+"&year="+year+"&choice=5yr",
    dataType: 'json',
    async: false,
  });
  return data.responseJSON;
}




window.addEventListener('load', () => {
    // Javascript code to execute after DOM content
   
    // full ZingChart schema can be found here:
    // https://www.zingchart.com/docs/api/json-configuration/

    
var searchCounty = document.getElementById("selcounty").value;
var searchCountyText = selcounty.options[selcounty.selectedIndex].text;
var searchYear = document.getElementById('selyear').value;
var searchYearText = selyear.options[selyear.selectedIndex].text;
var chartType = document.getElementById('seltype').value;

renderBtn.addEventListener('click', render);

    agepop = getAgeData(searchCounty,searchYear);
    //console.log(agepop);
    var malepop = [];
    var femalepop = [];
    for (i in agepop){
      malepop.push(parseInt(agepop[i].malepopulation));
      femalepop.push(parseInt(agepop[i].femalepopulation));
    }
    console.log(malepop);
    console.log(femalepop);

    let chartConfig = {
      type: 'pop-pyramid',
      globals: {
        fontSize: '14px'
      },
      title: {
        text: searchCountyText + ' Population by Age Group - ' + searchYearText,
        fontSize: '24px'
      },
      options: {
        // values can be: 'bar', 'hbar', 'area', 'varea', 'line', 'vline'
        aspect: 'hbar'/* ,
        side1: {
          plotarea: {
            backgroundColor: '#000'
          }
        },
        side2: {
          plotarea: {
            backgroundColor: '#000'
          }
        } */
      },
      legend: {
        shared: true
      },
      // plot represents general series, or plots, styling
      plot: {
        // hoverstate
        tooltip: {
          padding: '10px 15px',
          borderRadius: '3px'
        },
        valueBox: {
          color: '#000',
          placement: 'top-in',
          thousandsSeparator: ','
        },
        // animation docs here:
        // https://www.zingchart.com/docs/tutorials/design-and-styling/chart-animation/#animation__effect
        animation: {
          effect: 'ANIMATION_EXPAND_BOTTOM',
          method: 'ANIMATION_STRONG_EASE_OUT',
          sequence: 'ANIMATION_BY_NODE',
          speed: 222
        }
      },
      scaleX: {
        // set scale label
        label: {
          text: 'Age Groups'
        },
        labels: ['0-4', '5-9', '10-14', '15-19', '20-24', '25-29', '30-34', '35-39', '40-44', '45-49', '50-54', '55-59', '60-64', '65-69', '70-74', '75-79', '80-84', '85-89', '90-94', '95+'],
      },
      scaleY: {
        "short": true
      },
      series: [{
          text: 'Male',
          values: malepop,
          backgroundColor: '#6dace8 #007DF0',
          dataSide: 1
        },
        {
          text: 'Female',
          values: femalepop,
          backgroundColor: '#D40D12 #e04a4e',
          dataSide: 2
        }
      ]
    };
   
    // render chart
    zingchart.render({
      id: 'myChart',
      data: chartConfig,
      height: '80%',
      width: '100%',
    });
  });

  function render() {
    var searchCounty = document.getElementById("selcounty").value;
    var searchCountyText = selcounty.options[selcounty.selectedIndex].text;
    var searchYear = document.getElementById('selyear').value;
    var searchYearText = selyear.options[selyear.selectedIndex].text;
    var chartType = document.getElementById('seltype').value;
    agepop = getAgeData(searchCounty,searchYear);
    var malepop = [];
    var femalepop = [];
    for (i in agepop){
      malepop.push(parseInt(agepop[i].malepopulation));
      femalepop.push(parseInt(agepop[i].femalepopulation));
    }
    zingchart.render({
      id: 'myChart',
      data: {
        "graphset": [{
          "type": "pop-pyramid",
          globals: {
            fontSize: '14px'
          },
          legend: {
            shared: true
          },
          title: {
            text: searchCountyText + ' Population by Age Group - ' + searchYearText,
            fontSize: '24px'
          },
          options: {
            aspect: chartType,
            side1: {
              plotarea: {
                backgroundColor: '#000'
              }
            },
            side2: {
              plotarea: {
                backgroundColor: '#000'
              }
            }
          },
          plot: {
            stacked: true,
            tooltip: {
              padding: '10px 15px',
              borderRadius: '3px'
            },
            valueBox: {
              color: '#fff',
              placement: 'top-in',
              thousandsSeparator: ','
            },
            // animation docs here:
            // https://www.zingchart.com/docs/tutorials/design-and-styling/chart-animation/#animation__effect
            animation: {
              effect: 'ANIMATION_EXPAND_BOTTOM',
              method: 'ANIMATION_STRONG_EASE_OUT',
              sequence: 'ANIMATION_BY_NODE',
              speed: 222
            }
          },
          "scale-x": {
            "values": ["0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75-79", "80-84", "85-89", "90-94", "95+"]
          },
          "scale-y": {
            "short": true
          },
          "series": [{
              "text": "Male",
              "data-side": 1,
              "background-color": "#007DF0 #0055A4",
              "values": malepop,
            },
            {
              "text": "Female",
              "data-side": 2,
              "background-color": "#94090D #D40D12",
              "values": femalepop
            }
          ]
        }]
      },
      height: "80%",
      width: "100%"
    });
  }