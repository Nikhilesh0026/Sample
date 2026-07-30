package test;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

public class browers {

	
	@Test
	public void brower() {
		
		
		WebDriver driver = new ChromeDriver();
		driver.get("https://www.google.com");
		
	}
}
