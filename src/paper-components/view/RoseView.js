import React from 'react';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import RoseViewField from '../partial/RoseViewField';

const RoseView = ({ user, view_updateFunction, view_updateFunctionText,
    view_secondFunction, view_secondFunctionText,
    view_updateFunction_callback
}) => {

    const { birthday, dateMet, email, homeLocation, name, nickName, notes, phoneNumber, placeMetAt, picture, tags, work } = user || {};
    const { homeLocationCoords, homeFormatted_address, homeLocationName } = homeLocation || {};
    const { placeMetAtLocationCoords, placeMetAtFormatted_address, placeMetAtName } = placeMetAt || {};
    
    const viewRows = [
        {
            value: name || '(No-Name?)', subtitle: 'name',
            left: "account",
            rightIcon: "account-plus",
            rightFunc: () => { },
        },
        {
            value: nickName || '(No-nickName?)', subtitle: 'nickname',
            left: "account",
            rightIcon: "account-plus",
            rightFunc: () => { },
        },
        {
            value: phoneNumber || '(123456789)', subtitle: 'phone',
            left: "phone",
            rightIcon: "phone",
            rightFunc: () => { },
        },
        {
            value: email, subtitle: 'email',
            left: "email",
            rightIcon: "email",
            rightFunc: () => { },
        },
        {
            value: work || '(Add Occupation!)', subtitle: 'occupation',
            left: "briefcase-account",
            rightIcon: "briefcase-plus",
            rightFunc: () => { },
        },
        {
            value: (tags && tags.length > 0) ? tags : '(Add some Tags!)', subtitle: 'tags',
            left: "tag",
            rightIcon: "tag",
            rightFunc: () => { },
        },
        {
            value: notes || '(Add some notes!)', subtitle: 'notes',
            left: "note",
            rightIcon: "note",
            rightFunc: () => { },
        },
        {
            value: birthday.toString() || '(Enter Birthday!)', subtitle: 'birthday',
            left: "calendar",
            rightIcon: "calendar-heart",
            rightFunc: () => { },
        },
        {
            value: dateMet.toString() || '(Enter Date met!)', subtitle: 'date met',
            left: "calendar",
            rightIcon: "calendar-heart",
            rightFunc: () => { },
        },
        {
            value: homeFormatted_address || '(Add location!)', subtitle: 'home location',
            left: "crosshairs-gps",
            rightIcon: "crosshairs-gps",
            rightFunc: () => { },
        },
        {
            value: placeMetAtFormatted_address || '(Add location!)', subtitle: 'place met',
            left: "crosshairs-gps",
            rightIcon: "crosshairs-gps",
            rightFunc: () => { },
        },
    ];

    return (
        <ScrollView>
            {
                viewRows.map(({ value, subtitle, left, rightIcon, rightFunc }) => (
                    <RoseViewField
                        key={subtitle}
                        value={value}
                        subtitle={subtitle}
                        left={left}
                        rightIcon={rightIcon}
                        rightFunc={rightFunc}
                        dataDetectorType={'phoneNumber'}
                    />
                ))}
            <Button onPress={view_updateFunction}> {view_updateFunctionText} </Button>
            <Button
                style={{ marginBottom: 10 }}
                onPress={() => {
                    const roseId = user.roseId;
                    view_secondFunction({ roseId, callback: view_updateFunction_callback })
                }}
            > {view_secondFunctionText}
            </Button>
        </ScrollView>
    );
};

export default RoseView;