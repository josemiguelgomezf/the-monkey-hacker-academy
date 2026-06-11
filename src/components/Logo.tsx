import logoAsset from "@/assets/mongohacker-logo.png.asset.json";

export function Logo({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src={logoAsset.url}
      alt="MongoHacker"
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      loading="eager"
    />
  );
}
