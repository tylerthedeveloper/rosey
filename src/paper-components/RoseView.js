import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import RoseCardField from './RoseCardField';

const RoseView = ({ user, view_updateFunction, view_updateFunctionText,
    view_secondFunction, view_secondFunctionText,
    view_updateFunction_callback
}
) => {


    // console.log(user.birthday);
    
    // TODO: ADD homeLocation

    const { birthday, email, homeLocation: { homeCity, homeState, homeCountry }, name, nickName, phoneNumber, placeMetAt, picture, tags, work } = user || {};

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
            value: (tags && tags.length > 0) ? tags : '(Add some Tags!)', subtitle: 'tag',
            left: "tag",
            rightIcon: "tag",
            rightFunc: () => { },
        },
        {
            value: birthday || '(Enter Birthday!)', subtitle: 'birthday',
            left: "calendar",
            rightIcon: "calendar-heart",
            rightFunc: () => { },
        },
    ];
    return (
        <ScrollView>
            {
                viewRows.map(({ value, subtitle, left, rightIcon, rightFunc }) => (
                    <RoseCardField
                        key={subtitle}
                        value={value}
                        subtitle={subtitle}
                        left={left}
                        rightIcon={rightIcon}
                        rightFunc={rightFunc}
                    />
                ))}
            <Button onPress={view_updateFunction}> {view_updateFunctionText} </Button>
            <Button
                style={{ marginBottom: 10 }}
                onPress={() => {
                    const roseId = user.roseId;
                    view_secondFunction({ roseId, callback: () => view_updateFunction_callback() })
                }}
            > {view_secondFunctionText}
            </Button>
        </ScrollView>
    );
};

export default RoseView;