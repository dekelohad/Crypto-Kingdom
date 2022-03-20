import { Container, Typography } from '@material-ui/core';
import { Carousel } from './components';
import { styles } from './Banner.styles';

const Banner = () => {
  return (
    <div style={styles.banner}>
      <Container style={styles.bannerContent}>
        <div style={styles.taglineContainer}>
          <Typography variant="h2" style={styles.taglineTopContent}>
            Crypto Kingdom
          </Typography>
          <Typography variant="subtitle2" style={styles.taglineBottomContent}>
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};

export default Banner;
