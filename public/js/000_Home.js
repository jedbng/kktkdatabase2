
// Load KKTK Status google charts 
var statDataObj;
function getStatData(SrKKTKAct,SrKKTKIn,JrKKTKAct,JrKKTKIn){
  function getData(){
    this.SrKKTKAct=SrKKTKAct,
    this.SrKKTKIn=SrKKTKIn,
    this.JrKKTKAct=JrKKTKAct,
    this.JrKKTKIn=JrKKTKIn
  }
  statDataObj = new getData(SrKKTKAct,SrKKTKIn,JrKKTKAct,JrKKTKIn);
}
google.charts.load('current', {packages: ['corechart', 'bar']});
google.charts.setOnLoadCallback(drawMultSeries);
function drawMultSeries() {
      var data = google.visualization.arrayToDataTable([
        ['Status', 'Active', 'Inactive'],
        ['Sr KKTK', statDataObj.SrKKTKAct, statDataObj.SrKKTKIn],
        ['Jr KKTK', statDataObj.JrKKTKAct, statDataObj.JrKKTKIn]
      ]);

      var options = {
        title: 'KKTK Status',
        chartArea: {width: '50%'},
        hAxis: {
          title: 'KKTK Status',
          minValue: 0
        },
        vAxis: {
          title: 'Status'
        }
      };

      var chart = new google.visualization.BarChart(document.getElementById('StatusX'));
      chart.draw(data, options);
}