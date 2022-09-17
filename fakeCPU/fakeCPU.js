class FakeCPU {
    constructor() {
        this.registers = {
            r1: null,
            r2: null,
            r3: null,
            r4: null,
            r5: null,

            ip: 0,
            label: null,
            flag: null,
        }

        this.instructions = {
            run: this.run,
            add: this.add,
            sub: this.sub,
            cmp: this.cmp,
            jmp: this.jmp,
            mov: this.mov,

            log: this.logRegisters,
        }
    }

    run = (arr) => {
        while (this.registers.ip < arr.length) {
            const el = arr[this.registers.ip];
            console.log(el, 'el')
            if (el.type === 'instruction') {
                this.instructions[el.instructionName](...el.arg);
                ++this.registers.ip;
                continue;
            }
            if (el.type === 'label') {
                this.registers.label = el.labelName;
                ++this.registers.ip;
                continue;
            }
            if (el.type === 'jump') {
                const index = arr.findIndex(el => el.labelName === el.label);

                if (index === -1) {
                    ++this.registers.ip;
                }
                else {
                    this.registers.ip = index;
                }
            }
        }
    }

    add = (arg1, arg2) => {
        if (this.registers[arg1] && this.registers[arg2]) {
            this.registers[arg1] = this.registers[arg1] + this.registers[arg2];
        }

        if (!this.registers[arg1] && !this.registers[arg2]) {
            this.registers.r1 = arg1 + arg2;
        }
    }

    sub = (arg1, arg2) => {
        if (this.registers[arg1] && this.registers[arg2]) {
            this.registers[arg1] = this.registers[arg1] - this.registers[arg2];
        }

        if (!this.registers[arg1] && !this.registers[arg2]) {
            this.registers.r2 = arg1 - arg2;
        }
    }

    mov = (dest, src) => {
        this.registers[dest] = src;

        if (this.registers[dest] && this.registers[src]) {
            this.registers[dest] = this.registers[src];
        }

        if (this.registers[dest] && !this.registers[src]) {
            this.registers[dest] = src;
        }
    }

    cmp = (arg1, arg2) => {
        let innerFlag = null;

        if (this.registers[arg1] && this.registers[arg2]) {
            innerFlag = this.registers[arg1] > this.registers[arg2] ? 1 : this.registers[arg1] < this.registers[arg2] ? -1 : 0;
            this.registers.flag = innerFlag;
        }

        if (this.registers[arg1] && !this.registers[arg2]) {
            innerFlag = this.registers[arg1] > arg2 ? 1 : this.registers[arg1] < arg2 ? -1 : 0;
            this.registers.flag = innerFlag;
        }

        if (!this.registers[arg1] && this.registers[arg2]) {
            innerFlag = arg1 > this.registers[arg2] ? 1 : arg1 < this.registers[arg2] ? -1 : 0;
            this.registers.flag = innerFlag;
        }

        if (!this.registers[arg1] && !this.registers[arg2]) {
            innerFlag = arg1 > arg2 ? 1 : arg1 < arg2 ? -1 : 0;
            this.registers.flag = innerFlag;
        }
    }

    jmp = (label) => {
        this.registers.label = label;
    }

    logRegisters = () => {
        return this.registers
    }
}

module.exports = FakeCPU;