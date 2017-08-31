package com.eastrobot.robotdev.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class PropertiesUtils{
    
    private static Properties properties = null;//Properties Object  
    
    static{
        load();
    }
    
    public static void load(){  
        properties = new Properties();//Create a Properties object  
        try {  
            InputStream in = PropertiesUtils.class.getResourceAsStream( "/app.properties" );  
            properties.load(in);//Load the file Properties to flow to the object  
        } catch (IOException e) {  
            e.printStackTrace();  
        }  
    }
    
    /** 
     * Through the attribute name to get attribute values 
     * @param key 
     * @return 
     */  
    public static String get(String key ){
        if( properties == null ){
            load();
        }
        return properties.getProperty(key);
    }  
}
