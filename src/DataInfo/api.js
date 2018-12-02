import React from 'react';

import axios from 'axios';

export default axios.create({
    baseURL: `https://log515-backend.herokuapp.com/classroom/B-3404`
});