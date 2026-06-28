const TierImg = ({ tier = 0 }: { tier?: number }): React.ReactElement => {
  const safeTier = tier >= 0 && tier <= 31 ? tier : 0;
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="h-[19px] w-[19px]" src={`/assets/tierImg/${safeTier}.svg`} alt={`Tier ${tier}`} />;
};

export default TierImg;
