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
import AntDesign from 'react-native-vector-icons/AntDesign';
import SpaceComponent from './SpaceComponent';

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

    useEffect(() => {
        selected && setDataSelected(selected)

    }, [isVisible, selected])

    const handleSelectedItems = (id: string) => {
        if (multiple){
            const  data = [...dataSelected]

            const index = data.findIndex(element => element === id)

            if (index !== -1){
                data.splice(index, 1)
             } else {
                data.push(id)
             }

             setDataSelected(data)
        } else {
            setDataSelected([id])
        }
    }

    const handleConfirmSelect = () => {
        onSelect(dataSelected)
        setIsVisible(false);
        setDataSelected([]);
    }

    const handleRemoveItemSelected = (index: number) =>{
        if (selected) {
            selected.splice(index, 1)

            onSelect(selected)
        }
    }

    const renderSelectedItem = (id: string, index: number) => {

        const item = items.find(element => element.value === id)

        return (item && (<RowComponent key={id}
        onPress={() => handleRemoveItemSelected(index)}
        styles={{
            marginRight: 4,
            padding: 4,
            borderRadius: 100,
            borderWidth: 0.5,
            borderColor: colors.gray2,
            marginBottom: 8
        }}
        >
            <TextComponent text={item.label} flex={0}/>
            <SpaceComponent width={8}/>
            <AntDesign name='close' size={14} color={colors.text}/>
        </RowComponent>)
        )
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
                    {
                        selected && selected.length > 0 ? <RowComponent justify='flex-start' styles={{flexWrap: 'wrap'}}>
                            {selected.map((id, index) => renderSelectedItem(id, index))}
                        </RowComponent>
                    : <TextComponent text='Select' color={colors.gray2} flex={0} />
                    }
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
                    <ButtonComponent text='Confirm' onPress={handleConfirmSelect} />
                </View>
            </Modal>
        </View>
    )
}

export default DropDownPicker
