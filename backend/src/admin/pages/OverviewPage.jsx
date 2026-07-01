import React from 'react';
import HubPage from '../components/HubPage';
import { hubs } from '../data/hubs';

const OverviewPage = () => <HubPage hub={hubs.overview} />;

export default OverviewPage;
