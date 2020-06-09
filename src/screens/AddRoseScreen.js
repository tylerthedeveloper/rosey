import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Context as RoseContext } from '../context/RoseContext';
// import { MyHeader } from '../paper-components/memo';
import { RoseForm } from '../paper-components/view';
import roseyApi from '../api/roseyApi';

const AddRoseScreen = ({ navigation, route }) => {

    const { addRose } = useContext(RoseContext);
    const { shared, userID } = route.params || {};

    const [user, setUser] = useState({});

    const _getSharedUser = async (userID) => {
        console.log(userID)
        try {
            const response = await roseyApi.post(`/users/share`, { userID });
            const { user } = response.data;
            alert(`That user has a name of: ${user.name}`);
            return user;
        } catch (e) {
            alert('There was a problem loading that user');
        }
    }

    useEffect(() => {
        if (shared && userID !== '' && userID !== undefined) {
            const user = _getSharedUser(userID);
            setUser({...user});
        }
    }, [])

    return (
        <View style={styles.container}>
            {/* <MyHeader style={styles.title}> Add Rose </MyHeader> */}
            {
                (!user)
                    ? <RoseForm
                        submitButtonText="Add Rose"
                        form_updateFunction={addRose}
                        form_updateFunctionText="Add new Rose"
                        form_secondFunction={navigation.goBack}
                        form_secondFunctionText="Cancel"
                        form_updateFunction_callback={(obj) => navigation.replace('RoseDetail',
                            { roseId: obj.roseId }
                        )}
                    />
                    : <RoseForm
                        submitButtonText="Add Rose"
                        user={user}
                        form_updateFunction={addRose}
                        form_updateFunctionText="Add new Rose"
                        form_secondFunction={navigation.goBack}
                        form_secondFunctionText="Cancel"
                        form_updateFunction_callback={(obj) => navigation.replace('RoseDetail',
                            { roseId: obj.roseId }
                        )}
                    />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'flex-start',
    },
    title: {
        // alignSelf: 'center',
        // alignContent: 'center',
        marginLeft: 50,
        paddingLeft: 20
    }
});

export default AddRoseScreen;