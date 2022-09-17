# cpu-simple-simulator

example for testing my code
[
    {
        type: 'instruction',
        instructionName: 'add',
        arg: [2, 4],
    },
    {
      type: 'label',
      labelName: 'loop',
    },
    {
        type: 'instruction',
        instructionName: 'sub',
        arg: [10, 4],
    },
    {
        type: 'instruction',
        instructionName: 'mov',
        arg: ['r3', 67],
    },
    {
        type: 'instruction',
        instructionName: 'cmp',
        arg: [49, 67],
    },
    // {
    //     type: 'jump',
    //     instructionName: 'jmp',
    // },
]
