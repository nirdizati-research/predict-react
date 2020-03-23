export const limeList =
[
    [
        [
            'prefix_1',
            '0'
        ],
        -0.1116
    ],
    [
        [
            'prefix_2',
            '0'
        ],
        0.0970
    ],
    [
        [
            'prefix_3',
            '0'
        ],
        0.0262
    ],
    [
        [
            'prefix_4',
            'administrative fee - the first pol'
        ],
        0.0262
    ],
    [
        [
            'prefix_5',
            'outpatient follow-up consultation'
        ],
        0.0262
    ]
];

export const traceList = [{
    'attributes': {
        'Start date': '2007-01-01T00:14:24+01:00',
        'concept:name': '00000912',
        'Diagnosis code': 'M16',
        'End date': '2008-01-28T23:45:36+01:00',
        'Specialism code': 'SC7',
        'Treatment code': 'TC803',
        'Diagnosis': 'Sereus adenoca: ovarium st IIIc',
        'Diagnosis Treatment Combination ID': 'DTC674183',
        'label': 'true',
        'Age': 51
    },
    'events': [
        {
            'Activity code': 'AC370000',
            'concept:name': 'assumption laboratory',
            'Specialism code': 'SC86',
            'Producer code': 'CRPO',
            'lifecycle:transition': 'complete',
            'Section': 'Section 4',
            'Number of executions': 1,
            'time:timestamp': '2007-03-01T00:00:00+01:00',
            'group': 'General Lab Clinical Chemistry'
        },
        {
            'Activity code': 'AC370000',
            'concept:name': 'assumption laboratory',
            'Specialism code': 'SC86',
            'Producer code': 'CRPO',
            'lifecycle:transition': 'complete',
            'Section': 'Section 4',
            'Number of executions': 1,
            'time:timestamp': '2007-03-01T00:00:00+01:00',
            'group': 'General Lab Clinical Chemistry'
        }
    ]
}];

export const decodedDFResultList = {
        'prefix_1': [
            'Register',
            'Register',
            'Register'],
        'prefix_2': [
            'Register',
            'Register',
            'Register'],
        'org:resource_1': [
            'PR3',
            'PR3',
            'PR3']
};

export const iceResultList = [
        'False',
        [
            {
                'value': '12.0',
                'label': 1.0000,
                'count': 1
            },
            {
                'value': '16.0',
                'label': 1.0000,
                'count': 1
            },
            {
                'value': '18.0',
                'label': 2.0000,
                'count': 1
            },
        ]
];

export const shapResult = [
    'False',
    ''
];

export const skaterResult = [
    'False',
    ''
];

export const limeTemporalStabilityResult = {
    '2_3301': {
        'prefix_1': {
            'prefix_2': {
                'value': 'High Insurance Check',
                'importance': -35642.4310
            },
            'prefix_1': {
                'value': 'Register',
                'importance': 0.0000
            }
        }
    }
};

export const temporalStabilityResult = {
    '2_3301': {
        'prefix_1': {
            'value': 'Register',
            'predicted': 0
        }
    }
};


