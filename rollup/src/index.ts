import { getDate } from './utils'
import request from 'superagent'

export function hello() {
  return 'hello'
}

export class Person {
  constructor(private name: string) {}
  getName() {
    return this.name
  }
}

export function newDate() {
  return getDate()
}

export function baidu() {
  return request.get('https://www.baidu.com').then((res) => res.text)
}
