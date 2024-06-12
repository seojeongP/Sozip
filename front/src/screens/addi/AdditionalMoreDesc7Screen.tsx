import { addiNavigations, colors } from '@/constants';
import { AddiStackParamList } from '@/navigations/stack/AddtionalStackNavigator';
import useThemeStore from '@/store/useThemStore';
import { ThemeMode } from '@/types';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type AdditionalMoreDescScreenProps  = StackScreenProps<AddiStackParamList, typeof addiNavigations.ADDI_MORE_DESC7>;

function AdditionalMoreDesc7Screen({navigation}: AdditionalMoreDescScreenProps) {
  const {theme} = useThemeStore();
  const styles = styling(theme);
  return (
    <ScrollView >
      <SafeAreaView style={styles.headerContainer}>
          <MaterialIcons name='keyboard-arrow-left' size={40} color={colors[theme].GRAY_400} onPress={() => navigation.goBack()}/>
      </SafeAreaView>
      <View style={styles.container}>
      <Text style={styles.textTitle}>정부, 비아파트 주택 10만 호 매입 및 청년월세 지원 확대</Text>
      <View>
        <Text style={styles.Title}>정부 청년 지원 사업 확대</Text>
      </View>
      <Text style={styles.description}>최근 정부가 서민 주거비 안정을 위해 중요한 발표를 했습니다. 앞으로 2년 동안 비아파트 주택 10만 호를 매입하여 임대주택으로 공급하고, 청년월세 지원을 확대하는 계획을 밝혔습니다.</Text>
      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>🏠 비아파트 주택 10만 호 매입</Text>
        <Text style={styles.description}>정부는 비아파트 주택 10만 호를 매입하여 전세와 월세로 공급할 예정입니다. 이 중 전세는 2만5천 호, 월세는 7만5천 호가 포함됩니다. 전세 물량은 한국토지주택공사(LH)와 주택도시보증공사(HUG)가 각각 1만5천 호와 1만 호를 ‘든든전세’라는 이름으로 공급합니다.</Text>
        <Text style={styles.description}>LH가 공급하는 1만5천 호는 신축 매입으로 채워질 예정입니다. 올해는 5천 호, 내년에는 1만 호를 배정할 계획이며, 전용면적 60㎡에서 85㎡를 대상으로 하여 무주택 중산층 다자녀 가구도 이용할 수 있도록 합니다. 임대료는 주변 전세가의 90% 수준이며, 거주기간은 최대 8년까지 가능합니다. 소득과 자산을 따지지 않으며, 무주택자이면 누구나 신청할 수 있습니다. 출산가구를 지원하기 위해 신생아와 다자녀 가구에 가점을 부여하고, 잔여 물량은 추첨제로 공급합니다.</Text>
        <Text style={styles.description}>HUG는 기존에 확보한 기축 주택을 든든전세로 공급할 예정입니다. 소득과 자산에 관계없이 무주택자를 대상으로 추첨을 통해 공급합니다.</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>🙌🏻 신축 매입 임대 주택 확대</Text>
        <Text style={styles.description}>기존의 6만 호였던 신축 매입 임대 주택은 올해 5천 호, 내년 1만 호 등 총 7만5천 호로 확대됩니다. 이 주택들은 무주택 저소득층, 신혼부부, 청년 가구에게 시세 대비 30%~50% 수준의 저렴한 가격으로 최대 20년간 제공될 예정입니다.</Text>
        <Text style={styles.description}>정부는 든든전세와 신축 매입 임대가 원활히 진행되도록 건축 중인 주택의 매입을 허용하고 심사 기간을 단축할 예정입니다. 또한 민간 사업자의 참여를 촉진하기 위해 양도소득세와 취득세 감면 일몰 기한을 2027년 12월로 연장합니다.</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>💰 청년 월세 지원 확대</Text>
        <Text style={styles.description}>19세에서 34세의 청년을 대상으로 하는 청년 월세 지원 사업은 보증금과 월세 기준 등 거주 요건 제한을 없앴습니다. 소득 기준은 중위소득 60% 이하로 유지하며, 지원 기간은 1년에서 2년으로 늘어났습니다.</Text>
      </View>

      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>📑 전세 반환 보증 확대</Text>
        <Text style={styles.description}>전세 반환 보증 가입료 지원 대상도 만 39세 미만 청년에서 전 연령으로 확대됐습니다. 소득 기준은 청년의 경우 연간 5천만 원 이하, 청년 외의 경우 6천만 원, 신혼부부는 7천5백만 원으로 변경되었습니다.</Text>
      </View>
      <View style={{gap: 10}}>
        <Text style={styles.subTitle}>⭐️ 주거급여 및 기타 지원</Text>
        <Text style={styles.description}>올해 주거급여 지원 대상은 기준 중위소득 48%로 확대되어, 지난해보다 5만 가구 늘어난 145만 가구로 늘어났습니다. 또한, 주택 청약에서 60㎡ 이하의 비아파트 주택을 소유한 경우에도 무주택으로 간주하는 공시가격 기준을 수도권 3억 원, 비수도권 2억 원으로 상향 조정했습니다.</Text>
        <Text style={styles.description}>신생아 특별 공급과 연계되지 않는다는 지적이 있었던 신생아 특례 대출도 개선되었습니다. 입주 시점에서 신생아 연령이 2세를 초과하더라도 지원 대상에 포함됩니다.</Text>
      </View>
      <Text style={styles.textTitle}>이번 정부의 정책은 서민과 청년층의 주거 안정에 큰 도움이 될 것으로 기대됩니다. 앞으로도 지속적인 지원과 개선이 이루어지기를 바랍니다.</Text>
      </View>
    </ScrollView>
  )
}

const styling = (theme: ThemeMode)=> StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    gap: 20,
  },
  textTitle: {
    color: colors[theme].BLACK,
    fontSize: 17,
    fontWeight: '500',
  },
  Title: {
    color: colors[theme].BLACK,
    fontSize: 20,
    fontWeight: '800',
  },
  subTitle: {
    color: colors[theme].BLACK,
    fontSize: 15,
    fontWeight: '500',
  },
  description: {
    color: colors[theme].BLACK,
    fontSize: 13,
    fontWeight: '300',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    zIndex: 1,
    width: '100%',
  },
});

export default AdditionalMoreDesc7Screen;