import React, {PureComponent} from 'react';
import {Card, CardTitle, CardText} from 'react-md/lib/Cards/index';
import PropTypes from 'prop-types';
import viz from '../../mock_data/viz.svg';
import InlineSVG from 'svg-inline-react';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

class ShapResult extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
      };
    }

    render() {
        return (
            <Card className="md-block-centered">
                <div style={{cursor: 'pointer'}} title="Click to zoom in" >
                    <div>
                    <CardTitle title="Skater result for the model"></CardTitle>
                        {!this.props.isSkaterValuesLoaded ?
                        <CircularProgress id="query-indeterminate-progress"/> : null}
                        <CardText>
                         {JSON.stringify(this.props.skaterValueList) !='{}'?
                          <InlineSVG
                            onClick={()=> this.showSvgNewPage(this.props.skaterValueList)}
                            style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                            href preserveAspectRatio="xMidYMid slice"
                            alt="svg" src={this.props.skaterValueList}/>
                        : null}
                        </CardText>
                    </div>
                </div>
            </Card>
        );
    }
    showSvgNewPage(svg) {
        let v = window.open('');
        v.document.write(svg);
    }
}
ShapResult.propTypes = {
    skaterValueList: PropTypes.any.isRequired,
    traceId: PropTypes.any,
    isSkaterValuesLoaded: PropTypes.bool.isRequired
};
export default ShapResult;
