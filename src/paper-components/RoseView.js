import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import RoseCardField from './RoseCardField';

const RoseView = ({ user, view_updateFunction, view_updateFunctionText,
    view_secondFunction, view_secondFunctionText }
) => {


    console.log(user.birthday);
    const { birthday, email, homeLocation, name, nickName, phoneNumber, placeMetAt, picture, tags, work } = user || {};

    const viewRows = [
        {
            value: name || '(No-Name?)', subtitle: 'name',
            left: "account",
            rightIcon: "account-plus",
            rightFunc: () => { },
            // editFunc: setName
        },
        {
            value: nickName || '(No-nickName?)', subtitle: 'nickname',
            left: "account",
            rightIcon: "account-plus",
            rightFunc: () => { },
            // editFunc: setNickName
        },
        {
            value: phoneNumber || '(123456789)', subtitle: 'phone',
            left: "phone",
            rightIcon: "phone",
            rightFunc: () => { },
            // editFunc: setPhone
        },
        {
            value: email, subtitle: 'email',
            left: "email",
            rightIcon: "email",
            rightFunc: () => { },
            // editFunc: setEmail
        },
        {
            value: work || '(Add Occupation!)', subtitle: 'occupation',
            left: "briefcase-account",
            rightIcon: "briefcase-plus",
            rightFunc: () => { },
            // editFunc: setWork
        },
        {
            value: (tags && tags.length > 0) ? tags : '(Add some Tags!)', subtitle: 'tag',
            left: "tag",
            rightIcon: "tag",
            rightFunc: () => { },
            // editFunc: setTags/
        },
        {
            value: birthday || '(Enter Birthday!)', subtitle: 'birthday',
            left: "calendar",
            rightIcon: "calendar-heart",
            rightFunc: () => { },
            // editFunc: setBirthday
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
                onPress={view_secondFunction} > {view_secondFunctionText}
            </Button>
        </ScrollView>
    );
};

export default RoseView;