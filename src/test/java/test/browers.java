package test;




import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;


public class browers {

	@Test
    public void test() throws InterruptedException {
	
		WebDriver driver = new ChromeDriver();
		
		 driver.get("https://www.google.com");
		 Thread.sleep(10000);
    }
}
