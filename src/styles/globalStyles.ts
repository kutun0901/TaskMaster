import { Dimensions, Platform, StyleSheet } from "react-native";
import {colors} from "../constants/colors"
import { fontFamilies } from "../constants/fontFamilies";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bgColor,
        paddingTop: Platform.OS === 'ios' ? 12 : 10
    },

    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center'
    },

    section: {
        marginBottom: 16,
        paddingHorizontal: 10,
    },

    documentImg: {
        marginHorizontal: 4,
    },

    tag: {
        borderRadius: 100,
        paddingHorizontal: 20,
        paddingVertical: Platform.OS === "ios" ? 6 : 4,
        backgroundColor: colors.blue,
    },

    inputContainer: {
        backgroundColor: colors.gray,
        borderRadius: 12,
        paddingHorizontal: Platform.OS === "ios" ? 12 : 10,
        // paddingVertical: 12,

    },

    text: {
        fontSize: 14,
        fontFamily: fontFamilies.regular,
        color: colors.text
    },

    card: {
        borderRadius: 12
    },

    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: "center",
        alignItems: 'center',
        marginBottom: 16
      },


    modalContainer: {
        padding: 20,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    modalContent: {
        width: Dimensions.get('window').width * 0.8,
        padding: 20,
        borderRadius: 12,
        backgroundColor: colors.white
    }
})
