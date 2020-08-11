import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import React, { useContext, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Caption, Drawer, Paragraph, Title, useTheme, Divider } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { AuthContext } from '../context/AuthContext';
import useContacts from '../hooks/useContacts';

// import { PreferencesContext } from './context/preferencesContext';

const DrawerContent = (props) => {
    const paperTheme = useTheme();
    const { navigation } = props;

    const { state: { user }, signout } = useContext(AuthContext);
    const name = (user) ? user.name : '';

    // const { getImportedContacts } = useContext(ContactsContext);
    const { getContactsPermissions } = useContacts();

    // TODO: Explore if this needs to live somewhere else?
    useEffect(() => {
        // getImportedContacts();
        getContactsPermissions();
    }, []);

    // TODO: Try to get second inital
    const firstInitial = (name) ? name.substring(0, 1).toUpperCase() : '';

    // const { rtl, theme, toggleRTL, toggleTheme } = React.useContext(
    //     PreferencesContext
    // );
    const toggleTheme = () => { };

    const translateX = Animated.interpolate(props.progress, {
        inputRange: [0, 0.5, 0.7, 0.8, 1],
        outputRange: [-100, -85, -70, -45, 0],
    });

    const drawerRows = [
        { label: "Contact Card", icon: 'account-outline', navigateTo: 'ContactCard' },
        { label: "Contacts", icon: 'contacts', navigateTo: 'ContactsScreen' },
        { label: "Tags", icon: 'tag', navigateTo: 'TagScreen' },
        { label: "QR Code", icon: 'qrcode', navigateTo: 'QRCode' },
        // { label: "QR Code", icon: 'qrcode', navigateTo: 'QRCode' },
    ]

    const secondDrawerRow = [
        { label: "Rozy Story", icon: 'book-open-variant', navigateTo: 'RozyStory', type: "MCI" },
        { label: "Feedback", icon: 'feedback', navigateTo: 'Feedback', type: 'MI' }
    ]

    return (
        <DrawerContentScrollView {...props}>
            <Animated.View
                style={[
                    styles.drawerContent,
                    {
                        backgroundColor: paperTheme.colors.surface,
                        transform: [{ translateX }],
                    },
                ]}
            >
                <View style={styles.userInfoSection}>
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => {
                            navigation.toggleDrawer();
                        }}
                    >
                        {
                            (firstInitial)
                                ? <Avatar.Text size={40} label={firstInitial} />
                                : <Avatar.Image
                                    source={
                                        require('../../assets/app-icon.png')
                                    }
                                    size={50}
                                />
                        }
                    </TouchableOpacity>
                    <Title style={styles.title}>{name || 'Rozy'}</Title>
                    {/* <Caption style={styles.caption}>@</Caption>
                    <View style={styles.row}>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                202
                            </Paragraph>
                            <Caption style={styles.caption}>Obserwuje</Caption>
                        </View>
                        <View style={styles.section}>
                            <Paragraph style={[styles.paragraph, styles.caption]}>
                                159
                            </Paragraph>
                            <Caption style={styles.caption}>Obserwujący</Caption>
                        </View>
                    </View> */}
                </View>
                <Divider style={{ marginTop: 15, marginHorizontal: 20 }} />
                <Drawer.Section style={styles.drawerSection}>
                    {
                        drawerRows.map(({ label, icon, navigateTo }, index) => (
                            <DrawerItem
                                key={index}
                                icon={({ color, size }) => (
                                    <MaterialCommunityIcons
                                        name={icon}
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label={label}
                                labelStyle={{ fontFamily: 'System' }}
                                style={{ flex: 1 }}
                                onPress={() => navigation.navigate(navigateTo)}
                            />)
                        )
                    }
                </Drawer.Section>
                <Drawer.Section style={styles.drawerSection}>
                    {
                        secondDrawerRow.map(({ label, icon, navigateTo, type }, index) => (
                            <DrawerItem
                                key={index}
                                icon={({ color, size }) => {
                                    return (type == "MCI")
                                        ? <MaterialCommunityIcons
                                            name={icon}
                                            color={color}
                                            size={size}
                                        />
                                        : <MaterialIcons
                                            name={'feedback'}
                                            color={color}
                                            size={size}
                                        />
                                }}
                                label={label}
                                labelStyle={{ fontFamily: 'System' }}
                                style={{ flex: 1 }}
                                onPress={() => navigation.navigate(navigateTo)}
                            />)
                        )
                    }
                </Drawer.Section>
                <DrawerItem
                    icon={({ color, size }) => (
                        <MaterialCommunityIcons
                            name={'logout-variant'}
                            color={color}
                            size={size}
                        />
                    )}

                    label={"Logout"}
                    labelStyle={{ fontFamily: 'System' }}
                    style={{ flex: 1 }}
                    onPress={() => signout()}
                />
                {/* <Drawer.Section title="Preferences">
                    <TouchableRipple onPress={toggleTheme}>
                        <View style={styles.preference}>
                            <Text>Dark Theme</Text>
                            <View pointerEvents="none">
                                <Switch value={theme === 'dark'} />
                            </View>
                        </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={toggleRTL}>
                        <View style={styles.preference}>
                            <Text>RTL</Text>
                            <View pointerEvents="none">
                                <Switch value={rtl === 'right'} />
                            </View>
                        </View>
                    </TouchableRipple>
                </Drawer.Section> */}
            </Animated.View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        marginTop: 20,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});

export default DrawerContent;