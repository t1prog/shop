import Container from "@app/ui/Container";
import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer>
      <Container>
        <div className={styles.Footer}>
          <div className="flex flex-col">
            {/* <span className="text-xl">Активация Windows</span>
            <span>
              Чтобы активировать Windows, перейдите в раздел "Параметры".
            </span> */}
            FOOTER
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
