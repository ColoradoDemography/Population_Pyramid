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
    var searchCounty2 = document.getElementById("selcounty2").value;
    var searchCounty2Text = selcounty2.options[selcounty2.selectedIndex].text;
    var searchYear2 = document.getElementById('selyear2').value;
    var searchYear2Text = selyear2.options[selyear2.selectedIndex].text;
    //var chartType = document.getElementById('seltype').value;

    renderBtn.addEventListener('click', render);

    agepop = getAgeData(searchCounty,searchYear);
    agepop2 = getAgeData(searchCounty2,searchYear2);
    //console.log(agepop);
    var malepop = [];
    var femalepop = [];
    var malepop2 = [];
    var femalepop2 = [];
    for (i in agepop){
      malepop.push(parseInt(agepop[i].malepopulation));
      femalepop.push(parseInt(agepop[i].femalepopulation));
    }
    for (i in agepop2){
      malepop2.push(parseInt(agepop2[i].malepopulation));
      femalepop2.push(parseInt(agepop2[i].femalepopulation));
    }
    console.log(malepop);
    console.log(femalepop);
    console.log(malepop2);
    console.log(femalepop2);
    
    let chartConfig1 = {
      
        type: 'pop-pyramid',
        globals: {
          fontSize: '14px'
        },
        title: {
          text: searchCountyText + ' Population by Age - ' + searchYearText,
          fontSize: '20px'
        },
        options: {
          // values can be: 'bar', 'hbar', 'area', 'varea', 'line', 'vline'
          aspect: 'hbar',
          'label-placement': "middle",
          side1: {
            plotarea: {
              backgroundColor: '#EEE'
            }
          },
          side2: {
            plotarea: {
              backgroundColor: '#EEE'
            }
          }
        },
        legend: {
          visible: false,
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
            placement: 'bottom-in',
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
          "values": ["0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75-79", "80-84", "85-89", "90-94", "95+"],
          item: {
            'font-color': "black"
          }
        },
        scaleY: {
          "short": true,
          item: {
            'font-color': "black"
          }
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

    let chartConfig2 = {
      
      type: 'pop-pyramid',
      globals: {
        fontSize: '14px'
      },
      title: {
        text: searchCounty2Text + ' Population by Age - ' + searchYear2Text,
        fontSize: '20px'
      },
      options: {
        // values can be: 'bar', 'hbar', 'area', 'varea', 'line', 'vline'
        aspect: 'hbar',
        'label-placement': "middle",
        side1: {
          plotarea: {
            backgroundColor: '#EEE'
          }
        },
        side2: {
          plotarea: {
            backgroundColor: '#EEE'
          }
        }
      },
      legend: {
        visible: false,
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
          placement: 'bottom-in',
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
        "values": ["0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75-79", "80-84", "85-89", "90-94", "95+"],
        item: {
          'font-color': "black"
        }
      },
      scaleY: {
        "short": true,
        item: {
          'font-color': "black"
        }
      },
      series: [{
          text: 'Male',
          values: malepop2,
          backgroundColor: '#6dace8 #007DF0',
          dataSide: 1
        },
        {
          text: 'Female',
          values: femalepop2,
          backgroundColor: '#D40D12 #e04a4e',
          dataSide: 2
        }
      ]
   };
   
    // render chart
    zingchart.render({
      id: 'myChart1',
      data: chartConfig1,
      height: '100%',
      width: '100%',
    });
    zingchart.render({
      id: 'myChart2',
      data: chartConfig2,
      height: '100%',
      width: '100%',
    });
  });

  function render() {
    var searchCounty = document.getElementById("selcounty").value;
    var searchCountyText = selcounty.options[selcounty.selectedIndex].text;
    var searchYear = document.getElementById('selyear').value;
    var searchYearText = selyear.options[selyear.selectedIndex].text;
    var searchCounty2 = document.getElementById("selcounty2").value;
    var searchCounty2Text = selcounty2.options[selcounty2.selectedIndex].text;
    var searchYear2 = document.getElementById('selyear2').value;
    var searchYear2Text = selyear2.options[selyear2.selectedIndex].text;
    //var chartType = document.getElementById('seltype').value;
    agepop = getAgeData(searchCounty,searchYear);
    agepop2 = getAgeData(searchCounty2,searchYear2);
    //console.log(agepop);
    var malepop = [];
    var femalepop = [];
    var malepop2 = [];
    var femalepop2 = [];
    var agerange = [];
    var agerange2 = [];
    for (i in agepop){
      malepop.push(parseInt(agepop[i].malepopulation));
      femalepop.push(parseInt(agepop[i].femalepopulation));
    }
    for (i in agepop2){
      malepop2.push(parseInt(agepop2[i].malepopulation));
      femalepop2.push(parseInt(agepop2[i].femalepopulation));
    }
    if (searchYear < 2010){
      agerange = ["0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75-79", "80-84", "85-89", "90+", ""];
    } else {
      agerange = ["0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75-79", "80-84", "85-89", "90-94", "95+"];
    }
    if (searchYear2 < 2010){
      agerange2 = ["0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75-79", "80-84", "85-89", "90+", ""];
    } else {
      agerange2 = ["0-4", "5-9", "10-14", "15-19", "20-24", "25-29", "30-34", "35-39", "40-44", "45-49", "50-54", "55-59", "60-64", "65-69", "70-74", "75-79", "80-84", "85-89", "90-94", "95+"];
    }

    zingchart.render({
      id: 'myChart1',
      data: {
          "type": "pop-pyramid",
          globals: {
            fontSize: '14px'
          },
          legend: {
            visible: false,
            shared: true
          },
          title: {
            text: searchCountyText + ' Population by Age - ' + searchYearText,
            fontSize: '20px'
          },
          options: {
            aspect: 'hbar',
            'label-placement': "middle",
            side1: {
              plotarea: {
                backgroundColor: '#EEE'
              }
            },
            side2: {
              plotarea: {
                backgroundColor: '#EEE'
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
              color: '#000',
              placement: 'bottom-in',
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
            //need a function to determine year for values as pre-2010 only goes to 90
            "values": agerange,
            item: {
              'font-color': "black"
            }
          },
          "scale-y": {
            "short": true,
            item: {
              'font-color': "black"
            }
          },
          "series": [{
              "text": "Male",
              "data-side": 1,
              "background-color": "#6dace8 #007DF0",
              "values": malepop,
            },
            {
              "text": "Female",
              "data-side": 2,
              "background-color": "#D40D12 #e04a4e",
              "values": femalepop
            }
          ]
      },
      height: "100%",
      width: "100%"
    });

    zingchart.render({
      id: 'myChart2',
      data: {
          "type": "pop-pyramid",
          globals: {
            fontSize: '14px'
          },
          legend: {
            visible: false,
            shared: true
          },
          title: {
            text: searchCounty2Text + ' Population by Age - ' + searchYear2Text,
            fontSize: '20px'
          },
          options: {
            aspect: 'hbar',
            'label-placement': "middle",
            side1: {
              plotarea: {
                backgroundColor: '#EEE'
              }
            },
            side2: {
              plotarea: {
                backgroundColor: '#EEE'
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
              color: '#000',
              placement: 'bottom-in',
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
            //need a function to determine year for values as pre-2010 only goes to 90
            "values": agerange2,
            item: {
              'font-color': "black"
            }
          },
          "scale-y": {
            "short": true,
            item: {
              'font-color': "black"
            }
          },
          "series": [{
              "text": "Male",
              "data-side": 1,
              "background-color": "#6dace8 #007DF0",
              "values": malepop2,
            },
            {
              "text": "Female",
              "data-side": 2,
              "background-color": "#D40D12 #e04a4e",
              "values": femalepop2
            }
          ]
      },
      height: "100%",
      width: "100%"
    });
  }