import React from 'react';
import { render } from 'react-dom';
import '../semantic-ui/semantic.less';

import {HelloWorld} from './HelloWorld';

render(<HelloWorld />, document.getElementById('index'));
