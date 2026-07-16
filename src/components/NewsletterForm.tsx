import { EmailGate } from "./EmailGate";
import { useI18n } from "@/lib/i18n";

export function NewsletterForm({ variant = "default" }: { variant?: "default" | "compact" }) {
  const { t } = useI18n();
  return (
    <EmailGate
      source="mongomail"
      variant={variant}
      ctaLabel={t("mongomail.cta")}
      placeholder={t("mongomail.placeholder")}
      successMessage={t("mongomail.success")}
    />
  );
}
