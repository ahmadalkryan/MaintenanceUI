import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const StatisticsCard = ({ title, value, color }) => {
    return (
        <Card sx={{ minWidth: 275, textAlign: 'center' }}>
            <CardContent>
                <Typography variant="h5" component="div" color={`${color}.main`}>
                    {value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StatisticsCard;