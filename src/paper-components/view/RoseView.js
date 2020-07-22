import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Linking from 'expo-linking';
import useCalendar from '../../hooks/useCalendar';
import useContacts from '../../hooks/useContacts';
import { Button, Divider } from 'react-native-paper';
import RoseViewField from '../partial/RoseViewField';
import moment from 'moment';
import { SocialIcon } from 'react-native-elements'
import { Tooltip, Text } from 'react-native-elements';
import { MyShadowCard } from '../memo';

const RoseView = ({ user, isApiLoading, view_updateFunction, view_updateFunctionText,
    view_secondFunction, view_secondFunctionText,
    view_updateFunction_callback
}) => {

    const { birthday, dateMet, email, homeLocation, name, nickName, notes, personalSite, phoneNumber, placeMetAt, picture, socialProfiles, tags, work } = user || {};
    const { homeLocationCoords, homeFormatted_address, homeLocationName } = homeLocation || {};
    const { placeMetAtLocationCoords, placeMetAtFormatted_address, placeMetAtName } = placeMetAt || {};

    const { createContact } = useContacts();
    const { createEvent } = useCalendar();

    // TODO: move to constants?
    //
    // ─── FUNCTIONS ──────────────────────────────────────────────────────────────────
    //
    const _formatPhonenumber = (phone) => {
        const cleaned = ('' + phone).replace(/\D/g, '')
        const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        // console.log('hone', phone, match)
        if (match) {
            const intlCode = (match[1] ? '+1 ' : '');
            const formattedNumber = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
            return formattedNumber;
        }
    }
    // ────────────────────────────────────────────────────────────────────────────────

    const viewRows = [
        {
            value: name, subtitle: 'name',
            left: "account",
            rightIcon: "account-plus",
            rightFunc: () => { createContact(user) },
        },
        {
            value: nickName, subtitle: 'nickname',
            left: "account",
            // rightIcon: "account-plus",
            // rightFunc: () => { },
            rightFunc: null,
        },
        {
            value: _formatPhonenumber(phoneNumber), subtitle: 'phone',
            left: "phone",
            // TODO: country code?
            rightIcon: "phone-plus",
            rightFunc: () => { Linking.openURL(`tel:${phoneNumber}`) },
            secondRightIcon: "message-plus",
            secondRightFunc: () => { Linking.openURL(`sms:${phoneNumber}`) },
        },
        {
            value: email, subtitle: 'email',
            left: "email",
            rightIcon: "email-plus",
            rightFunc: () => {
                Linking.openURL(`mailto:${email}`)
            },
        },
        {
            value: personalSite, subtitle: 'personal site',
            left: "web",
            rightIcon: "web",
            rightFunc: () => {
                Linking.openURL(`${personalSite}`)
            }
        },
        {
            value: work, subtitle: 'occupation',
            left: "briefcase-account",
            // rightIcon: "briefcase-plus",
            rightFunc: null,
        },
        {
            value: tags ? ((Array.isArray(tags) && tags.length > 0) ? tags.join(', ') : tags) : '(Add some Tags!)', subtitle: 'tags',
            // value: updated_tags, subtitle: 'Add tags (by commas) ',
            left: "tag",
            rightFunc: null
            // rightIcon: "tag",
        },
        {
            value: notes, subtitle: 'notes',
            left: "note",
            // rightIcon: "note",
            // rightFunc: () => { },
            rightFunc: null,

        },
        {
            value: dateMet ? (moment(dateMet).format('MMM DD, YYYY')) : '(Enter Date met!)', subtitle: 'date met',
            left: "calendar",
            rightIcon: "calendar-plus",
            rightFunc: () => { if (dateMet) createEvent(dateMet, 'date_met', name, placeMetAtFormatted_address) },
        },
        {
            value: birthday ? (moment(birthday).format('MMM DD, YYYY')) : '(Enter Birthday!)', subtitle: 'birthday',
            left: "calendar",
            rightIcon: "calendar-plus",
            rightFunc: () => { if (birthday) createEvent(birthday, 'birthday', name, placeMetAtFormatted_address) },
        },
        {
            value: homeFormatted_address, subtitle: 'home location',
            left: "crosshairs-gps",
            rightIcon: "map-marker-plus",
            rightFunc: () => {
                const url = Platform.select({
                    ios: `maps:0,0?q=${homeFormatted_address}`,
                    android: `geo:0,0?q=${homeFormatted_address}`,
                })
                Linking.openURL(url)
            },
        },
        {
            value: placeMetAtFormatted_address, subtitle: 'place met',
            left: "crosshairs-gps",
            rightIcon: "map-marker-plus",
            rightFunc: () => {
                const url = Platform.select({
                    ios: `maps:0,0?q=${placeMetAtFormatted_address}`,
                    android: `geo:0,0?q=${placeMetAtFormatted_address}`,
                })
                Linking.openURL(url)
            },
        },
    ];

    const isUserContactCard = (view_updateFunctionText === 'Update your contact card');
    const contactCardRowsToIgnore = ['notes', 'date met', 'place met', 'tags']

    // https://app.urlgeni.us/

    const { facebook, linkedin, instagram, medium, snapchat, twitter, whatsapp } = socialProfiles || {};

    // https://pureoxygenlabs.com/10-app-url-schemes-for-marketers/
    const socialLinkedIcons = [
        { type: 'facebook', value: facebook, appUrl: `fb://profile?username=${facebook}`, webUrl: `https://facebook.com/${facebook}` },
        { type: 'linkedin', value: linkedin, appUrl: `linkedin://in/${linkedin}/`, webUrl: `https://linkedin.com/in/${linkedin}/` },
        { type: 'instagram', value: instagram, appUrl: `instagram://user?username=${instagram}`, webUrl: `https://instagram.com/${instagram}` },
        { type: 'medium', value: medium, appUrl: `https://medium.com/@${medium}`, webUrl: `https://medium.com/@${medium}` },
        { type: 'snapchat', value: snapchat, appUrl: `snapchat://add/${snapchat}`, webUrl: `https://www.snapchat.com/add/${snapchat}` },
        { type: 'twitter', value: twitter, appUrl: `twitter://user?screen_name=${twitter}`, webUrl: `https://twitter.com/${twitter}` },
        { type: 'whatsapp', value: whatsapp, appUrl: `https://wa.me/${whatsapp}`, webUrl: `https://wa.me/${whatsapp}` }
    ];

    return (
        <View style={{ flex: 1 }}>
            {/* Social Section */}
            <ScrollView style={{ marginBottom: 15, flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ marginVertical: 5 }}>
                    <MyShadowCard>
                        <View style={styles.socialMediaSection}>
                            {
                                socialLinkedIcons.map(({ appUrl, type, value, webUrl }) => (
                                    (value)
                                        ? <TouchableOpacity key={type} style={{ marginHorizontal: 10 }} onPress={() => {
                                            Linking.canOpenURL(appUrl)
                                                .then((supported) => Linking.openURL((supported) ? appUrl : webUrl))
                                                .catch((err) => console.error('An error occurred', err))
                                        }}
                                        >
                                            <SocialIcon
                                                // raised
                                                light
                                                style={{
                                                    opacity: (value && (appUrl || webUrl)) ? 1 : .4,
                                                }}
                                                type={type}
                                            />
                                        </TouchableOpacity>
                                        : <Tooltip key={type} popover={<Text style={{ color: 'white' }}>Edit your profile{"\n"}to add social media</Text>}
                                            containerStyle={{ flexWrap: 'wrap', height: 100 }}
                                        >
                                            <SocialIcon
                                                // raised
                                                light
                                                style={{
                                                    opacity: (value && (appUrl || webUrl)) ? 1 : .4,
                                                    marginHorizontal: 10
                                                }}
                                                type={type}
                                            />
                                        </Tooltip>
                                ))
                            }
                        </View>

                        {/* {
                            viewRows.map(({ value, subtitle, left, rightIcon, secondRightIcon, rightFunc, secondRightFunc }) => (
                                ((isUserContactCard && !contactCardRowsToIgnore.includes(subtitle) || !isUserContactCard))
                                    ? (isUserContactCard)
                                        ? <RoseViewField
                                            key={subtitle}
                                            value={value}
                                            subtitle={subtitle}
                                            left={left}
                                        />
                                        : <RoseViewField
                                            key={subtitle}
                                            value={value}
                                            subtitle={subtitle}
                                            left={left}
                                            rightIcon={rightIcon}
                                            rightFunc={rightFunc}
                                            secondRightIcon={secondRightIcon}
                                            secondRightFunc={secondRightFunc}
                                        />
                                    : null
                            ))
                        } */}
                        <Divider style={{ marginHorizontal: 30 }} />
                        {/* Fields Section */}
                        {
                            viewRows.map(({ value, subtitle, left, rightIcon, secondRightIcon, rightFunc, secondRightFunc }) => (
                                ((isUserContactCard && !contactCardRowsToIgnore.includes(subtitle) || !isUserContactCard))
                                    ? (isUserContactCard)
                                        ? <RoseViewField
                                            key={subtitle}
                                            value={value}
                                            subtitle={subtitle}
                                            left={left}
                                        />
                                        : <RoseViewField
                                            key={subtitle}
                                            value={value}
                                            subtitle={subtitle}
                                            left={left}
                                            rightIcon={rightIcon}
                                            rightFunc={rightFunc}
                                            secondRightIcon={secondRightIcon}
                                            secondRightFunc={secondRightFunc}
                                        />
                                    : null
                            ))
                        }
                    </MyShadowCard>
                </View>
                <View style={{ marginTop: 10 }}>
                    <Button onPress={view_updateFunction}> {view_updateFunctionText} </Button>
                    <Button
                        style={{ marginBottom: 10 }}
                        onPress={() => {
                            const roseId = user.roseId;
                            view_secondFunction({ roseId, callback: view_updateFunction_callback })
                        }}
                    > {view_secondFunctionText}
                    </Button>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    socialMediaSection: {
        // flex: 1,
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginHorizontal: 5,
        marginVertical: 10
    },
});

export default RoseView;