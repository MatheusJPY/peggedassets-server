import {
  PeggedIssuanceAdapter,
  Balances,
} from "../peggedAsset.type";
import { sumSingleBalance } from "../helper/generalUtil";
import { addressesUtxosAssetAll, getScriptsDatum } from "../helper/cardano";

async function getCardanoSupply() {
  let balances = {} as Balances;
  const usdm_count_nft_asset = "e319d8e6629ff7991c8ae4f8aec2e0f10463ebdf29b57d26d34914f65553444d5f434f554e54"
  const count_address = "addr1wyl82v9qy06hsz50hqqdy0u6xw9hdewy7twjahgek2tpp7c0qajez"
  const utxo = (await addressesUtxosAssetAll(count_address, usdm_count_nft_asset))[0]
  const datum_hash = utxo.data_hash
  const datum = await getScriptsDatum(datum_hash)
  const total_value_locked = datum.json_value.fields[0].int / 1_000_000
  sumSingleBalance(balances, "peggedUSD", total_value_locked, "issued", false);

  return balances;
}

const adapter: PeggedIssuanceAdapter = {
  cardano: {
    minted: getCardanoSupply,
  },
};

export default adapter;
