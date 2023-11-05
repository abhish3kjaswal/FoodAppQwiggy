import { sum } from "../sum"


test('Sum function should return sum of 2 numbers', () => { 
    
    const res=sum(3,4);

    expect(res).toBe(7);
 })