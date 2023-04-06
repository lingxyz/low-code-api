import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { AppService } from './app.service';
import { EntityManager } from 'typeorm';

// 配置文件
const helloApi = {
  params: [{
    name: "name",
    required: "true",
    message: "name不能为空"
  }, {
    name: "age",
    required: "true",
    message: "age不能为空"
  }],

  steps: [{
    type: "SQL",
    content: "select * from table",
    result: {}
  }, {
    type: "function",
    params: ['a'],
    content: "console.log(a); return '你的年纪是' + (Number(a.age) + 1)",
    result: {}
  }, {
    type: "function",
    params: ['a'],
    content: "console.log(a); return '你的名字是' + a.name + '；你的年纪加十岁是' + (Number(a.age) + 10)",
    result: {}
  }, {
    type: "script",
    content: "console.log(111)",
    result: {}
  }],

  response: {
    type: "json",
    data: "2" // step3
  }
  // {
  //   type: "excel",
  //   data: "step3"
  // }
  // {
  //   type: "status"
  // }
}


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly entityManager: EntityManager) {}

  @Get()
  async getHello(@Query() queryParams) {
    /* 参数验证 */
    helloApi.params.forEach(param => {
      // pass: http://localhost:3000/?name=zzz&age=12
      if (!queryParams[param.name] && param.required) {
        throw new BadRequestException(param.message);
      } 
    })
    /* 逻辑步骤 */
    // 循环step
    helloApi.steps.forEach(step => {
      if (step.type === 'SQL') {
        step.result = {step1: 'sql result obj'} // todo
      } 
      if (step.type === 'function') {
        const myFunction = new Function(...step.params, step.content);
        step.result = myFunction(queryParams); // step result = 2; step3 result = 11
      } 
      if (step.type === 'script') {
        step.result = eval(step.content)
      } 
    })


    /* 拼装返回值 */
    let response = {}
    if (helloApi.response.type === 'json') {
      response = {type: 'json', result: helloApi.steps[helloApi.response.data].result}
    } 
    if (helloApi.response.type === 'excel') {
      response = {type: 'excel', result: helloApi.response.data}
    } 
    if (helloApi.response.type === 'status') {
      response = {type: 'ok', status: 1}
    } 
    return response;
    
    // const queryResult = await this.entityManager.query(
    //   'SELECT * FROM users WHERE age = ? AND name = ?',
    //   [age, name],
    // );
    // return queryResult;
    
    // return this.appService.getHello();
  }
}
