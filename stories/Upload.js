import React from 'react';
import {storiesOf} from '@storybook/react';
import UploadCard from '../src/components/upload/UploadCard';
import UploadDoubleCard from '../src/components/upload/UploadDoubleCard';


storiesOf('Upload', module)
    .add('Single file upload', () => {
            return (
                <div className="md-grid">
                    <div className="md-cell md-cell--12">
                        <UploadCard/>
                    </div>
                </div>
            );
        }
    )
    .add('Double file upload', () => {
            return (
                <div className="md-grid">
                    <div className="md-cell md-cell--12">
                        <UploadDoubleCard/>
                    </div>
                </div>
            );
        }
    )

;
