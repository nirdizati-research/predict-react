import React, {PureComponent} from 'react';
import {Card, CardText, CardTitle} from 'react-md/lib/Cards/index';
import nirdizati from '../images/nirdizati-logo-e1501821874335.png';
import {Avatar, Button, FontIcon, List} from 'react-md';
import GuideItem from './static/GuideItem';
import {dialog, rotate} from './training/LogMetricsCard';


class WalkThrough extends PureComponent {
    state = {visible: false, other: false};

    imageClick() {
        this.setState({visible: true});
    }

    otherClick() {
        this.setState({other: true});
    }

    hide() {
        this.setState({visible: false});
    }


    render() {
        return <Card className="md-cell md-block-centered md-cell--12">
            {dialog(this.state.visible, this.hide.bind(this))}
            <CardTitle title="Nirdizati Research"
                       subtitle="A Web Application to Support Research in Predictive Monitoring Tasks">
                <div className="md-cell--right">
                    <img src={nirdizati} alt="Nirdizati logo" onDoubleClick={this.imageClick.bind(this)}/>
                </div>
            </CardTitle>
            <CardText>
                <p>Nirdizati Research is a <span onDoubleClick={this.otherClick.bind(this)}>tool</span> that aims at
                    supporting
                    expert users in finding the best predictive models suitable for specific datasets and prediction
                    problems. The
                    predictive models can then be used to provide predictions at runtime on incomplete traces or streams
                    of
                    events.</p>

                <p>The tool offers a wide selection of features ranging from event log preprocessing options to
                    hyperparmeter
                    optimization as well as runtime feedback to the user.</p>

                <p>The standard procedure to be followed to use the application is summarized in the steps below.</p>
                {rotate(this.state.other)}
                <div className="md-grid">
                    <List className="md-cell md-cell--12 md-cell--8-tablet">
                        <GuideItem
                            avatar={<Avatar suffix="red">1</Avatar>}
                            button={<Button flat primary href={'/#/upload'}
                                            iconEl={<FontIcon>backup</FontIcon>}>Upload</Button>}
                            title="Upload"
                            text="Upload a log file"
                        />
                        <GuideItem
                            avatar={<Avatar suffix="orange">2</Avatar>}
                            button={<Button flat primary href={'/#/logs'} iconEl={<FontIcon>description</FontIcon>}>Log
                                details</Button>}
                            title="Log details"
                            text="Check the log details"
                            threeLines
                        />
                        <GuideItem
                            avatar={<Avatar suffix="yellow">3</Avatar>}
                            button={<Button flat primary href={'/#/split'}
                                            iconEl={<FontIcon>swap_horiz</FontIcon>}>Splitting</Button>}
                            title="Splitting"
                            text="Split the log file into training and validation log files"
                            threeLines
                        />
                        <GuideItem
                            avatar={<Avatar suffix="light-green">4</Avatar>}
                            button={<Button flat primary href={'/#/label'}
                                            iconEl={<FontIcon>label_outline</FontIcon>}>Labeling</Button>}
                            title="Labeling"
                            text="(Optional) Test the label distribution for a given labeling"
                            threeLines
                        />
                        <GuideItem
                            avatar={<Avatar suffix="green">5</Avatar>}
                            button={<Button flat primary href={'/#/training'}
                                            iconEl={<FontIcon>build</FontIcon>}>Training</Button>}
                            title="Training"
                            text="Submit a prediction task to train a predictive model with an array
                             of configuration options"
                            threeLines
                        />
                        <GuideItem
                            avatar={<Avatar suffix="cyan">6</Avatar>}
                            title="Task status"
                            text={'Check the status of the enqueued prediction tasks'}
                            button={<Button flat primary href={'/#/jobs'}
                                            iconEl={<FontIcon>list</FontIcon>}>Task status</Button>}
                            threeLines
                        />
                        <GuideItem
                            avatar={<Avatar suffix="blue">7</Avatar>}
                            button={<Button flat primary href={'/#/validation'}
                                            iconEl={<FontIcon>insert_chart</FontIcon>}>Validation</Button>}
                            title="Validation"
                            text="Compare the resulting models using different metrics and download the results"
                            threeLines
                        />
                         {/* <GuideItem*/}
                            {/* avatar={<Avatar suffix="purple">8</Avatar>}*/}
                            {/* title="Prediction"*/}
                            {/* text={'Create a prediction of an incomplete trace'}*/}
                            {/* button={<Button flat primary href={'/#/prediction'}*/}
                            {/* iconEl={<FontIcon>work</FontIcon>}>Prediction</Button>}*/}
                            {/* threeLines*/}
                        {/* />*/}
                        {/* <GuideItem*/}
                            {/* avatar={<Avatar suffix="pink">9</Avatar>}*/}
                            {/* button={<Button flat primary href={'/#/runtime'}*/}
                            {/* iconEl={<FontIcon>flash_on</FontIcon>}>Runtime</Button>}*/}
                            {/* title="Runtime"*/}
                            {/* text="Create continuous predictions for a stream of events"*/}
                            {/* threeLines*/}
                        {/* />*/}
                         {/* <GuideItem
                            avatar={<Avatar suffix="pink">8</Avatar>}
                            button={<Button flat primary href={'/#/explanation'}
                                            iconEl={<FontIcon>work</FontIcon>}>Explanation</Button>}
                             title="Explanation"
                             text="Explanation"
                             threeLines
                        /> */}
                    </List>
                </div>
            </CardText>
        </Card>;
    }
}


export default WalkThrough;
