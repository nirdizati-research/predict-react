import {
    classificationMethods,
    clusteringMethods,
    encodingMethods,
    predictionMethods,
    regressionMethods,
    thresholdControls
} from '../reference';
import {shallow} from 'enzyme';

describe('Reference', () => {
    it('controlCreator maps', () => {
        expect(clusteringMethods[1].key).toBe('kmeans');
        expect(clusteringMethods[1].value).toBe('kmeans');
        const label = shallow(clusteringMethods[1].label);
        expect(label.text()).toMatch(/K-means/);
        expect(label.text()).toMatch(/Assign traces/);
    });

    it('contains 2 clustering', () => {
        expect(clusteringMethods.length).toBe(2);
    });

    it('contains 10 classification', () => {
        expect(classificationMethods.length).toBe(10);
    });

    it('contains 5 encoding', () => {
        expect(encodingMethods.length).toBe(6);
    });

    it('contains 3 predictions', () => {
        expect(predictionMethods.length).toBe(3);
    });
    it('contains 5 regressions', () => {
        expect(regressionMethods.length).toBe(5);
    });

    it('contains 2 thresholds', () => {
        expect(thresholdControls.length).toBe(2);
    });
});
