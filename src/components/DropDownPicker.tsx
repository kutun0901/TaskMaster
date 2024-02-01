import { View, Text, FlatList, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { selectModel } from '../models/SelectModel';
import TitleComponent from './TitleComponent';
import RowComponent from './RowComponent';
import TextComponent from './TextComponent';
import { colors } from '../constants/colors';
import { ArrowDown2, SearchNormal1, TickCircle } from 'iconsax-react-native';
import { globalStyles } from '../styles/globalStyles';
import ButtonComponent from './ButtonComponent';
import InputComponent from './InputComponent';

interface Props {
    title?: string;
    items: selectModel[];
    selected?: string[];
    onSelect: (val: string[]) => void;
    multiple?: boolean;
}

const DropDownPicker = (props: Props) => {

    const { title, items, selected, multiple, onSelect } = props;
    const [isVisible, setIsVisible] = useState(false);
    const [searchKey, setSearchKey] = useState('')
    const [results, setResults] = useState<selectModel[]>([])
    const [dataSelected, setDataSelected] = useState<string[]>([])

    useEffect(() => {
        if (!searchKey){
            setResults([])
        } else {
            const data = items.filter(element => {
                // console.log(element.label)
                return element.label.toLowerCase().includes(searchKey.toLowerCase())
            })
            setResults(data);
        }

    }, [searchKey])

    const handleSelectedItems = (id: string) => {
        const  data = [...dataSelected]

        const index = data.findIndex(element => element === id)

        if (index !== -1){
            data.splice(index, 1)
         } else {
            data.push(id)
         }

         setDataSelected(data)
    }

    // console.log(items)
    return (
        <View style={{ marginBottom: 16 }}>
            {title && <TitleComponent text={title} />}
            <RowComponent onPress={() => setIsVisible(true)}
            styles={[globalStyles.inputContainer,
            {
                marginTop: title ? 8 : 0,
                paddingVertical: 16
            }
            ]}>
                <View style={{ flex: 1, paddingRight: 12 }}>
                    <TextComponent text='Select' color={colors.gray2} flex={0} />
                </View>
                <ArrowDown2 size={20} color={colors.text} />
            </RowComponent>
            <Modal visible={isVisible}
                style={{ flex: 1 }}
                transparent
                animationType='slide'
                statusBarTranslucent
            >
                <View style={[globalStyles.container,
                {
                    padding: 20,
                    paddingTop: 60,
                    paddingBottom: 60
                }]}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <RowComponent styles={{alignItems: 'center', justifyContent: 'center'}}>
                                <View style={{flex: 1, marginRight: 16}}>
                                    <InputComponent
                                    value={searchKey}
                                    onChange={val => setSearchKey(val)}
                                    placeHolder='Search..'
                                    prefix={<SearchNormal1 size={20} color={colors.gray2} />}
                                    allowClear
                                    />
                                </View>
                                <TouchableOpacity onPress={() => setIsVisible(false) }>
                                    <TextComponent color='coral' text='cancel' flex={0}/>
                                </TouchableOpacity>
                            </RowComponent>
                        }
                        style={{ flex: 1 }}
                        data={searchKey ? results : items}
                        renderItem={({ item }) => (
                            <RowComponent onPress={() => handleSelectedItems(item.value)} key={item.value} styles={{paddingVertical: 16}}>
                                <TextComponent text={item.label}
                                size={16}
                                color={dataSelected.includes(item.value) ? 'coral' : colors.text}
                                />
                                {
                                    dataSelected.includes(item.value) && (
                                        <TickCircle size={22} color='coral' />
                                    )
                                }
                            </RowComponent>
                        )}
                    />
                    <ButtonComponent text='Confirm' onPress={() => setIsVisible(false)} />
                </View>
            </Modal>
        </View>
    )
}

export default DropDownPicker
