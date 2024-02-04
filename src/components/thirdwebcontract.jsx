import { ThirdwebSDK } from "@thirdweb-dev/sdk";

// If used on the FRONTEND pass your 'clientId'
const sdk = new ThirdwebSDK("mumbai", {
  clientId: "JuM8zX_qjaHtEB_rJ2wUv1KQCdTZJeDhwaQXIO-eXVLYqF7Ijj_DXHsAmDgTGm2IfA81_YYuB0MQ4t-sa21vZg",
});
// --- OR ---
// If used on the BACKEND pass your 'secretKey'
// const sdk = new ThirdwebSDK("mumbai", {
//   secretKey: "YOUR_SECRET_KEY",
// });

const contract = await sdk.getContract("0x8C39Da722F38f54a995519d473Af2A6896846C84");