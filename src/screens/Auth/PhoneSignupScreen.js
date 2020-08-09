import React, { useContext, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { theme } from '../../core/theme';
import { Background, MyButton, MyTextInput } from '../../paper-components/memo';
import CountryPicker from "react-native-country-picker-modal";
import { TextInput } from 'react-native-paper';
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import firebase from 'firebase'

const PhoneSignupScreen = ({ navigation }) => {

    const { state: { errorMessage, isApiLoading }, signup, clearErrorMessage, signinWithFirebase } = useContext(AuthContext);

    const recaptchaVerifier = React.useRef(null);
    const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined;

    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setNumber] = useState('');
    const [country, setCountry] = useState();
    const [callingCode, setCallingCode] = useState('+1');

    const onSelectCountry = (country) => {
        setCountry(country)
        setCallingCode("+" + country.callingCode[0])
    };

    const sendPhoneCode = async () => {
        if (phoneNumber && callingCode) {
            if (!isLoading) {
                setIsLoading(true)
            }
            try {
                const number = callingCode + phoneNumber
                const phoneProvider = new firebase.auth.PhoneAuthProvider();
                const verificationId = await phoneProvider.verifyPhoneNumber(
                    number,
                    recaptchaVerifier.current
                );
                if (verificationId) {
                    // console.log(verificationId)
                    navigation.navigate('PhoneConfirmation', { verificationToken: verificationId });
                } else {
                    alert('There was a problem sending a code to that number')
                }
                if (isLoading) { setIsLoading(false) }
            } catch (error) {
                // if (isLoading) { setIsLoading(false) }
                console.log(error.message)
                setIsLoading(false)
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert('That email/password combo does not exist. Try again or signing Up');
                        break;
                    case 'auth/invalid-email':
                        alert('Please enter a valid email address');
                        break;
                    default:
                        alert('There was a problem sending a code to that number')
                        break;
                }
            }
        }
    }

    const isDisabled = (isLoading || (phoneNumber.length < 10))

    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            <View style={styles.row}>
                <View style={{
                    marginHorizontal: 5, flex: 1,
                    borderRadius: 3,
                    // backgroundColor: "#fff"
                }}>
                    <CountryPicker
                        countryCode={
                            country ? country.cca2 : "US"
                        }
                        callingCode
                        withEmoji
                        withAlphaFilter
                        withFilter
                        withCallingCode
                        withCallingCodeButton
                        onSelect={onSelectCountry}
                    />
                </View>
                <TextInput label="Phone Number"
                    value={phoneNumber}
                    autoCompleteType="tel"
                    textContentType="telephoneNumber"
                    keyboardType="phone-pad"
                    onChangeText={phoneNumber => setNumber(phoneNumber.replace(/[^0-9]/g, ''))}
                    returnKeyType={"done"}
                    style={{ flex: 4 }}
                />
            </View>
            {(errorMessage) ? <Text style={styles.errorMessage}> {errorMessage} </Text> : null}
            {(phoneNumber.length < 10)
                ? <Text style={styles.errorMessage}> Phone must be 10 digits </Text>
                : null
            }
            {(isLoading) && <ActivityIndicator animating={true} size={'large'} />}
            <MyButton
                mode="contained"
                onPress={sendPhoneCode}
                disabled={isDisabled}
            >
                Send Code
                </MyButton>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        flex: 1,
        alignItems: 'center',
        marginTop: 50
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        width: '80%'
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    errorMessage: {
        color: 'red',
        margin: 10
    },
});

export default PhoneSignupScreen;
