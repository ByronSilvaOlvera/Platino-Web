import { Component, Input, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { ThemeOption } from 'ngx-echarts';
import { CoolTheme } from './data-charts';


@Component({
  selector: 'app-charts-data-object',
  templateUrl: './charts-data-object.component.html',
  styleUrls: ['./charts-data-object.component.scss']
})
export class ChartsDataObjectComponent implements OnInit {

  @Input() valor:number=0;
  parametro1:number=0;
  parametro2:number=0;
  parametro3:number=0;

  constructor() {
    
    this.theme = 'Tema'
   }


  ngOnInit(): void {
    //console.log(this.valor);
    this.parametro1 = this.valor *0.10;
    this.parametro2 = this.valor *0.30;
    this.parametro3 = this.valor *0.60;
    //console.log(this.parametro2, this.parametro3, this.parametro1);
    
    
  }

  theme: string | ThemeOption;
  coolTheme = CoolTheme;
  options :EChartsOption = {
    title: {
      text: '',
      subtext: '',
      //x: 'center'
    },
    tooltip: {
      mainType: 'tooltip',
      axisPointer:{
        axis: 'radius'
      },
      trigger: 'axis',
      displayMode: 'single' 
    },
    legend: {
      show: true,
      selectedMode: 'multiple',
     
     
    },
    calculable: true,
    series: [
      {
        percentPrecision: 10 ,
        type: 'pie',
        roseType: 'area',
        name : 'area',
        radius: [30,110],
        clockwise : true,
        data: [
          { value: this.parametro1, name: 'No Visitan' },
          { value: this.parametro2, name: 'Infomacion incompleta' },
          { value: this.parametro3, name: 'Visitas' },
          // { value: 25, name: 'rose4' },
          // { value: 20, name: 'rose5' },
          // { value: 35, name: 'rose6' },
          // { value: 30, name: 'rose7' },
          // { value: 40, name: 'rose8' }
        ]
      }
    ]
  };


}
