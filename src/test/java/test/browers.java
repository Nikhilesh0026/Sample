package test;




import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;


public class browers {

	@Test
    public void test() throws InterruptedException {
	
		System.setProperty("webdriver.chrome.driver", "C:\\Users\\nkhetmalis\\Downloads\\chromedriver-win64_9342\\chromedriver-win64\\chromedriver.exe");
    	
		ChromeOptions options = new ChromeOptions();
		WebDriver driver = new ChromeDriver(options);
		
		 driver.get("https://www.google.com");
		 Thread.sleep(10000);
    }
}
