const FakeCPU = require('./fakeCPU/fakeCPU');
const data = require('./parser/parser');

const cpu = new FakeCPU();

cpu.run(data);
console.log(cpu.logRegisters());